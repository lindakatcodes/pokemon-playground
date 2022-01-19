import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHeroes from './heroes.reducer';

export const selectHeroesViewModel = createSelector();
