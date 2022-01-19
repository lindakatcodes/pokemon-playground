import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as HeroesActions from './heroes.actions';

@Injectable()
export class HeroesEffects {
  loadHeroes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HeroesActions.loadHeroes),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((data) => HeroesActions.loadHeroesSuccess({ data })),
          catchError((error) => of(HeroesActions.loadHeroesFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions) {}
}
