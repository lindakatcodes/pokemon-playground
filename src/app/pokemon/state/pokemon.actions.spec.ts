import * as fromPokemon from './pokemon.actions';

describe('loadPokemon', () => {
  it('should return an action', () => {
    expect(fromPokemon.loadPokemon().type).toBe('[Pokemon] Load Pokemon');
  });
});
