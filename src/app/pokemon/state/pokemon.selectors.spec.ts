import * as fromPokemon from './pokemon.reducer';
import { selectPokemonListViewModel } from './pokemon.selectors';

describe('Pokemon Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPokemonListViewModel({
      [fromPokemon.name]: {},
    });

    expect(result).toEqual({
      loading: false,
      pokemonList: [],
      pokemonDetailsList: [],
    });
  });
});
