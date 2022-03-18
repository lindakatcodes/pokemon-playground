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
import { PokemonState, selectCurrentOffsetValue } from './pokemon.reducer';

@Injectable()
export class PokemonEffects {
  loadPokemon$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemon, PokemonActions.loadMorePokemon),
      withLatestFrom(this.store.select(selectCurrentOffsetValue)),
      concatMap(([action, currentOffsetValue]) => {
        const updatedOffsetValue =
          currentOffsetValue + action.currentOffsetValue;
        return this.pokemonService
          .getPokemonList(action.currentOffsetValue)
          .pipe(
            map(({ results: pokemonList }) =>
              PokemonActions.loadPokemonSuccess({
                pokemonList,
                updatedOffsetValue,
              })
            ),
            catchError((error) =>
              of(PokemonActions.loadPokemonFailure({ error }))
            )
          );
      })
    );
  });

  private cache = new Map<string, any>();

  getPokemonDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemonSuccess),
      mergeMap(({ pokemonList }) => {
        // serialize the action
        const serializedAction = JSON.stringify(
          PokemonActions.loadPokemonSuccess.type
        );

        // if cache exists return cached value
        if (
          this.cache.has(serializedAction) ||
          !!localStorage.getItem(serializedAction)
        ) {
          const pokemonDetailsList =
            this.cache.get(serializedAction) ||
            localStorage.getItem(serializedAction);
          const deserializedPokemonList = JSON.parse(pokemonDetailsList);

          return [
            PokemonActions.getPokemonDetailsSuccess({
              pokemonDetails: deserializedPokemonList,
            }),
          ];
        }

        // else call forkJoin
        return forkJoin(...this.pokemonDetailsObs(pokemonList)).pipe(
          tap(console.log),
          map((pokemonList) => {
            const serializedPokemon = JSON.stringify(pokemonList);
            this.cache.set(serializedAction, serializedPokemon);
            localStorage.setItem(serializedAction, serializedPokemon);

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
