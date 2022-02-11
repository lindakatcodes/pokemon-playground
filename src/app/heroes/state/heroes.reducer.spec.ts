import { heroesFeature, initialState } from './heroes.reducer';

describe('Heroes Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = heroesFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
