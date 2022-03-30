import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  Pokemon,
  PokemonDetails,
  PokemonDetailsResponse,
  PokemonTypeBasicResponse,
} from '../models';
import { PokemonService } from '../pokemon.service';
import * as PokemonActions from './pokemon.actions';
import { PokemonState, selectCurrentCardCount } from './pokemon.reducer';

@Injectable()
export class PokemonEffects {
  loadPokemon$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemon),
      withLatestFrom(this.store.select(selectCurrentCardCount)),
      concatMap(([action, desiredOffset]) => {
        const updatedCount = desiredOffset + action.increaseCountBy;
        return this.pokemonService.getPokemonList(desiredOffset).pipe(
          map(({ results: pokemonList }) =>
            PokemonActions.loadPokemonSuccess({
              pokemonList,
              updatedCount,
            })
          ),
          catchError((error) =>
            of(PokemonActions.loadPokemonFailure({ error }))
          )
        );
      })
    );
  });

  getPokemonDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemonSuccess),
      mergeMap(({ pokemonList }) => {
        const dbName = 'cachedDetailsList';

        // if cache exists return cached value
        if (!!localStorage.getItem(dbName)) {
          const pokemonDetailsList = localStorage.getItem(dbName);
          const deserializedPokemonList = pokemonDetailsList
            ? JSON.parse(pokemonDetailsList)
            : [];

          return [
            PokemonActions.getPokemonDetailsSuccess({
              pokemonDetails: deserializedPokemonList,
            }),
          ];
        }

        // else call forkJoin
        return forkJoin(...this.pokemonDetailsObs(pokemonList)).pipe(
          tap(() => console.log('from getPokemonDetails')),
          map((pokemonList) => {
            const serializedPokemon = JSON.stringify(pokemonList);
            localStorage.setItem(dbName, serializedPokemon);

            return PokemonActions.getPokemonDetailsSuccess({
              pokemonDetails: pokemonList,
            });
          })
        );
      }),
      catchError((error) =>
        of(PokemonActions.getPokemonDetailsFailure({ error }))
      )
    );
  });

  loadMorePokemon$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadMorePokemon),
      withLatestFrom(this.store.select(selectCurrentCardCount)),
      concatMap(([action, desiredOffset]) => {
        const updatedCount = desiredOffset + action.increaseCountBy;
        return this.pokemonService.getPokemonList(desiredOffset).pipe(
          map(({ results: pokemonList }) =>
            PokemonActions.loadMorePokemonSuccess({
              pokemonList,
              updatedCount,
            })
          ),
          catchError((error) =>
            of(PokemonActions.loadMorePokemonFailure({ error }))
          )
        );
      })
    );
  });

  getMorePokemonDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadMorePokemonSuccess),
      mergeMap(({ pokemonList }) => {
        // get what currently exists
        const dbName = 'cachedDetailsList';
        const currentSerializedList = localStorage.getItem(dbName);
        const currentList = currentSerializedList
          ? JSON.parse(currentSerializedList)
          : [];

        // else call forkJoin
        return forkJoin(...this.pokemonDetailsObs(pokemonList)).pipe(
          tap(() => console.log('from getMorePokemonDetails')),
          map((pokemonList) => {
            const updatedList = currentList.concat(pokemonList);
            const serializedPokemon = JSON.stringify(updatedList);
            localStorage.setItem(dbName, serializedPokemon);

            return PokemonActions.getMorePokemonDetailsSuccess({
              pokemonDetails: updatedList,
            });
          })
        );
      }),
      catchError((error) =>
        of(PokemonActions.getMorePokemonDetailsFailure({ error }))
      )
    );
  });

  // TODO: add effect for handling general purpose error.
  // This could be created at the pokemon level for now because we mostly have this one feature
  // eventually we'll want more client-side error-handling beyond just API things

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private store: Store<PokemonState>
  ) {}

  private pokemonDetailsObs(
    pokemonList: Pokemon[]
  ): Observable<PokemonDetails>[] {
    return pokemonList.map((pokemon: Pokemon) => {
      return this.pokemonService.getPokemonDetails(pokemon.name).pipe(
        map((pokeData: PokemonDetailsResponse) => {
          const pokeTypeData = this.getPokemonTypes(pokeData.types);
          return {
            name: pokeData.name,
            id: pokeData.id,
            image: pokeData.sprites.front_default,
            types: pokeTypeData,
          };
        })
      );
    });
  }

  private getPokemonTypes(typesData: PokemonTypeBasicResponse[]): string[] {
    const typeNames: string[] = [];
    typesData.map((typeValue: PokemonTypeBasicResponse) => {
      typeNames.push(typeValue.type.name);
    });
    return typeNames.length === 0 ? [''] : typeNames;
  }
}
