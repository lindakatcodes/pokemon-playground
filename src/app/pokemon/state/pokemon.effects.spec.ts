import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { PokemonResponse } from '../models';
import { PokemonService } from '../pokemon.service';
import { PokemonEffects } from './pokemon.effects';

describe('PokemonEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: PokemonEffects;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(() => {
    pokemonService = jasmine.createSpyObj('PokemonService', [
      'getPokemonList',
      'getPokemonDetails',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(PokemonEffects);
  });

  it('should get a list of pokemon', (done) => {
    const expectedPokemonList: PokemonResponse = {
      count: 10,
      previous: '',
      next: '',
      results: [],
    };

    actions$ = of({ type: '[Pokemon] Load Pokemon' });
    pokemonService.getPokemonList.and.returnValue(of(expectedPokemonList));

    effects.loadPokemon$.subscribe((action) => {
      expect(action).toEqual({
        type: '[Pokemon] Load Pokemon Success',
        pokemonList: [],
      });
    });
    done();
  });
});
