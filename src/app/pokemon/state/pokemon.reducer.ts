import { createFeature, createReducer, on } from '@ngrx/store';
import { Pokemon } from '../models';
import * as PokemonActions from './pokemon.actions';

export interface PokemonState {
  pokemonList: Pokemon[];
  loading: boolean;
}

export const initialState: PokemonState = {
  pokemonList: [],
  loading: false,
};

const feature = createFeature({
  name: 'pokemon',
  reducer: createReducer(
    initialState,

    on(PokemonActions.loadPokemon, (state) => ({
      ...state,
      loading: true,
    })),
    on(PokemonActions.loadPokemonSuccess, (state, { pokemonList }) => ({
      ...state,
      pokemonList,
      loading: false,
    })),
    on(PokemonActions.loadPokemonFailure, (state) => ({
      ...state,
      loading: false,
    }))
  ),
});

export const {
  name,
  reducer,
  selectLoading,
  selectPokemonList,
  selectPokemonState,
} = feature;
