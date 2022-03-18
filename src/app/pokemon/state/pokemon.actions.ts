import { createAction, props } from '@ngrx/store';
import { Pokemon, PokemonDetails } from '../models';

export const loadPokemon = createAction(
  '[Pokemon] Load Pokemon',
  props<{ currentOffsetValue: number }>()
);

export const loadPokemonSuccess = createAction(
  '[Pokemon] Load Pokemon Success',
  props<{ pokemonList: Pokemon[]; updatedOffsetValue: number }>()
);

export const loadPokemonFailure = createAction(
  '[Pokemon] Load Pokemon Failure',
  props<{ error: any }>()
);

export const getPokemonDetailsSuccess = createAction(
  '[Pokemon] Get Pokemon Details Success',
  props<{ pokemonDetails: PokemonDetails[] }>()
);

export const getPokemonDetailsFailure = createAction(
  '[Pokemon] Get Pokemon Details Failure',
  props<{ error: any }>()
);

export const loadMorePokemon = createAction(
  '[Pokemon] Load More Pokemon',
  props<{ currentOffsetValue: number }>()
);
