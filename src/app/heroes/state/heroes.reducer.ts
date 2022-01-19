import { Action, createFeature, createReducer, on } from '@ngrx/store';
import * as HeroesActions from './heroes.actions';

export const heroesFeatureKey = 'heroes';

export interface HeroesState {}

export const initialState: HeroesState = {};

export const heroesFeature = createFeature({
  name: 'heroes',
  reducer: createReducer(
    initialState,
    on(HeroesActions.loadHeroes, (state) => state),
    on(HeroesActions.loadHeroesSuccess, (state, action) => state),
    on(HeroesActions.loadHeroesFailure, (state, action) => state)
  ),
});

const { name, reducer, selectHeroesState } = heroesFeature;
