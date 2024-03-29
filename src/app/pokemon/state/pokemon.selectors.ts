import { createSelector } from '@ngrx/store';
import { Pokemon, PokemonDetails } from '../models';
import * as fromPokemon from './pokemon.reducer';

export interface PokemonViewModel {
  loading: boolean;
  pokemonList: Pokemon[];
  pokemonDetailsList: PokemonDetails[];
}

export const selectPokemonListViewModel = createSelector(
  fromPokemon.selectLoading,
  fromPokemon.selectPokemonList,
  fromPokemon.selectPokemonDetailsList,
  (loading, pokemonList, pokemonDetailsList) => ({
    loading,
    pokemonList,
    pokemonDetailsList,
  })
);
