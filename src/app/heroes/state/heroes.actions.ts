import { createAction, props } from '@ngrx/store';

export const loadHeroes = createAction('[Heroes] Load Heroes');

export const loadHeroesSuccess = createAction(
  '[Heroes] Load Heroes Success',
  props<{ data: any }>()
);

export const loadHeroesFailure = createAction(
  '[Heroes] Load Heroes Failure',
  props<{ error: any }>()
);
