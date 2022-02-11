import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as PokemonActions from './pokemon.actions';

@Injectable()
export class PokemonEffects {
  loadPokemon$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemon),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((data) =>
            PokemonActions.loadPokemonSuccess({ pokemonList: data })
          ),
          catchError((error) =>
            of(PokemonActions.loadPokemonFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private actions$: Actions) {}
}
