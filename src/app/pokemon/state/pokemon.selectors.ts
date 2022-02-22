import { createSelector } from '@ngrx/store';
import { Pokemon } from '../models';
import * as fromPokemon from './pokemon.reducer';

export interface PokemonViewModel {
  pokemonList: Pokemon[];
  loading: boolean;
}

export const selectPokemonListViewModel = createSelector(
  fromPokemon.selectPokemonList,
  fromPokemon.selectLoading,
  (pokemonList, loading) => ({ pokemonList, loading })
);

// create a selector that return whatever slice of the individual pokemon's DTO
