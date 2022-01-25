import * as fromHeroes from './heroes.actions';

describe('loadHeroess', () => {
  it('should return an action', () => {
    expect(fromHeroes.loadHeroess().type).toBe('[Heroes] Load Heroess');
  });
});
