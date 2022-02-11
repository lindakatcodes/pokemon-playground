import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../models';

export const loadPokemon = createAction('[Pokemon] Load Pokemon');

export const loadPokemonSuccess = createAction(
  '[Pokemon] Load Pokemon Success',
  props<{ pokemonList: Pokemon[] }>()
);

export const loadPokemonFailure = createAction(
  '[Pokemon] Load Pokemon Failure',
  props<{ error: any }>()
);
