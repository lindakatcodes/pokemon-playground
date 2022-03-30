import { createFeature, createReducer, on } from '@ngrx/store';
import { Pokemon, PokemonDetails } from '../models';
import * as PokemonActions from './pokemon.actions';

export interface PokemonState {
  loading: boolean;
  currentCardCount: number;
  pokemonList: Pokemon[];
  pokemonDetailsList: PokemonDetails[];
}

export const initialState: PokemonState = {
  loading: false,
  currentCardCount: 0,
  pokemonList: [],
  pokemonDetailsList: [],
};

const feature = createFeature({
  name: 'pokemon',
  reducer: createReducer(
    initialState,

    on(PokemonActions.loadPokemon, PokemonActions.loadMorePokemon, (state) => ({
      ...state,
      loading: true,
    })),
    on(
      PokemonActions.loadPokemonSuccess,
      PokemonActions.loadMorePokemonSuccess,
      (state, { pokemonList, updatedCount }) => ({
        ...state,
        pokemonList,
        loading: true,
        currentCardCount: updatedCount,
      })
    ),
    on(
      PokemonActions.loadPokemonFailure,
      PokemonActions.loadMorePokemonFailure,
      (state) => ({
        ...state,
        loading: false,
      })
    ),
    on(
      PokemonActions.getPokemonDetailsSuccess,
      PokemonActions.getMorePokemonDetailsSuccess,
      (state, { pokemonDetails }) => ({
        ...state,
        loading: false,
        pokemonDetailsList: pokemonDetails,
      })
    ),
    on(
      PokemonActions.getPokemonDetailsFailure,
      PokemonActions.getMorePokemonDetailsFailure,
      (state) => ({
        ...state,
        loading: false,
      })
    )
  ),
});

export const {
  name,
  reducer,
  selectLoading,
  selectPokemonList,
  selectPokemonDetailsList,
  selectCurrentCardCount,
  selectPokemonState,
} = feature;
