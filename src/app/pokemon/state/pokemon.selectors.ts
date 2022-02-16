import { createSelector } from '@ngrx/store';
import { Pokemon } from '../models';
import * as fromPokemon from './pokemon.reducer';

export interface PokemonViewModel {
  pokemonList: Pokemon[];
  loading: boolean;
}

export const selectPokemonViewModel = createSelector(
  fromPokemon.selectPokemonList,
  fromPokemon.selectLoading,
  (pokemonList, loading) => ({ pokemonList, loading })
);
