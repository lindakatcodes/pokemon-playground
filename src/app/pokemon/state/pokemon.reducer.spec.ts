import { reducer, initialState, PokemonState } from './pokemon.reducer';
import { MockStore, getMockStore } from '@ngrx/store/testing';
import {
  getPokemonDetailsSuccess,
  loadPokemonSuccess,
} from './pokemon.actions';

describe('Pokemon Reducer', () => {
  let store: MockStore;
  beforeEach(() => {
    store = getMockStore({ initialState });
  });

  it('should return an array of pokemon on initial success', () => {
    const newState: PokemonState = {
      loading: true,
      pokemonList: [{ name: 'bulbasaur', url: '' }],
      pokemonDetailsList: [],
    };
    const action = loadPokemonSuccess({
      pokemonList: [{ name: 'bulbasaur', url: '' }],
    });
    const state = reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('should return an array of pokemon details on success', () => {
    const currentState: PokemonState = {
      loading: true,
      pokemonList: [{ name: 'bulbasaur', url: '' }],
      pokemonDetailsList: [],
    };

    const newState: PokemonState = {
      loading: false,
      pokemonList: [{ name: 'bulbasaur', url: '' }],
      pokemonDetailsList: [
        { name: 'bulbasaur', id: 1, image: '', types: [''] },
      ],
    };
    const action = getPokemonDetailsSuccess({
      pokemonDetails: [{ name: 'bulbasaur', id: 1, image: '', types: [''] }],
    });
    const state = reducer(currentState, action);

    expect(state).toEqual(newState);
  });
});
