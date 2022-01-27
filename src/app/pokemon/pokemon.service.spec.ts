import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Pokemon } from './models';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let httpCLientSpy: jasmine.SpyObj<HttpClient>;
  let pokemonService: PokemonService;

  beforeEach(() => {
    httpCLientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    pokemonService = new PokemonService(httpCLientSpy);
  });

  it('should get all pokemon', (done: DoneFn) => {
    // ASSEMBLE
    const expectedPokemon: Pokemon[] = [
      {
        name: 'bulbasaur',
        url: '',
      },
    ];

    // ACT
    httpCLientSpy.get.and.returnValue(of(expectedPokemon));

    // ASSERT
    pokemonService.getPokemonList().subscribe({
      next: (pokemon) => {
        expect(pokemon)
          .withContext('expected pokemon')
          .toEqual(expectedPokemon);
        done();
      },
      error: done.fail,
    });

    expect(httpCLientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
