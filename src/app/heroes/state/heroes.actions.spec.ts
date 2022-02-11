import * as fromHeroes from './heroes.actions';

describe('loadHeroes', () => {
  it('should return an action', () => {
    expect(fromHeroes.loadHeroes().type).toBe('[Heroes] Load Heroes');
  });
});
