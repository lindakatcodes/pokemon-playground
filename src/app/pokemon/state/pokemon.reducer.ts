import { createFeature, createReducer, on } from '@ngrx/store';
import { Pokemon, PokemonDetails } from '../models';
import * as PokemonActions from './pokemon.actions';

export interface PokemonState {
  loading: boolean;
  pokemonList: Pokemon[];
  pokemonDetailsList: PokemonDetails[];
}

export const initialState: PokemonState = {
  loading: false,
  pokemonList: [],
  pokemonDetailsList: [],
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
      loading: true,
    })),
    on(PokemonActions.loadPokemonFailure, (state) => ({
      ...state,
      loading: false,
    })),
    on(
      PokemonActions.getPokemonDetailsSuccess,
      (state, { pokemonDetails }) => ({
        ...state,
        loading: false,
        pokemonDetailsList: pokemonDetails,
      })
    ),
    on(PokemonActions.getPokemonDetailsFailure, (state) => ({
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
  selectPokemonDetailsList,
  selectPokemonState,
} = feature;
