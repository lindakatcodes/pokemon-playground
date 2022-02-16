import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as PokemonActions from './pokemon.actions';
import { PokemonService } from '../pokemon.service';

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

  // TODO: add effect for handling general purpose error.
  // This could be created at the pokemon level for now because we mostly have this one feature
  // eventually we'll want more client-side error-handling beyond just API things

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}
}
