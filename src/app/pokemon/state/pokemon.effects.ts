import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';

import * as PokemonActions from './pokemon.actions';
import { PokemonService } from '../pokemon.service';
import { Pokemon, PokemonDetails, PokemonDetailsResponse } from '../models';

@Injectable()
export class PokemonEffects {
  loadPokemon$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemon),
      concatMap(() =>
        this.pokemonService.getPokemonList().pipe(
          map(({ results: pokemonList }) =>
            PokemonActions.loadPokemonSuccess({ pokemonList })
          ),
          catchError((error) =>
            of(PokemonActions.loadPokemonFailure({ error }))
          )
        )
      )
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
    private pokemonService: PokemonService
  ) {}

  private pokemonDetailsObs(
    pokemonList: Pokemon[]
  ): Observable<PokemonDetails>[] {
    return pokemonList.map((pokemon: Pokemon) => {
      return this.pokemonService.getPokemonDetails(pokemon.name).pipe(
        map((pokeData: PokemonDetailsResponse) => ({
          name: pokeData.name,
          id: pokeData.id,
          image: pokeData.sprites.front_default,
        }))
      );
    });
  }
}
