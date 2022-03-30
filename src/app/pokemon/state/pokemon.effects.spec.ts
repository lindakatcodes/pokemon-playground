import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { PokemonResponse } from '../models';
import { PokemonService } from '../pokemon.service';
import { PokemonEffects } from './pokemon.effects';
import { initialState } from './pokemon.reducer';

describe('PokemonEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: PokemonEffects;
  let pokemonService: jasmine.SpyObj<PokemonService>;
  let store: MockStore;

  beforeEach(() => {
    pokemonService = jasmine.createSpyObj('PokemonService', [
      'getPokemonList',
      'getPokemonDetails',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PokemonEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    });

    effects = TestBed.inject(PokemonEffects);
    store = TestBed.inject(MockStore);
  });

  it('should get a list of pokemon', (done) => {
    const expectedPokemonList: PokemonResponse = {
      count: 10,
      previous: '',
      next: '',
      results: [],
    };

    actions$ = of({ type: '[Pokemon] Load Pokemon', increaseCountBy: 10 });
    pokemonService.getPokemonList.and.returnValue(of(expectedPokemonList));

    effects.loadPokemon$.subscribe((action) => {
      expect(action).toEqual({
        type: '[Pokemon] Load Pokemon Success',
        pokemonList: [],
        updatedCount: 10,
      });
    });
    done();
  });
});
