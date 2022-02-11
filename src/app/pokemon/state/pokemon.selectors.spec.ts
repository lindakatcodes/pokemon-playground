import * as fromPokemon from './pokemon.reducer';
import { selectPokemonState } from './pokemon.selectors';

describe('Pokemon Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPokemonState({
      [fromPokemon.name]: {},
    });

    expect(result).toEqual({
      pokemonList: [],
      loading: false,
    });
  });
});
