import { createFeatureSelector } from '@ngrx/store';
import * as fromPokemon from './pokemon.reducer';

export const selectPokemonState =
  createFeatureSelector<fromPokemon.PokemonState>(fromPokemon.name);
