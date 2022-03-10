import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Pokemon, PokemonResponse } from './models';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let pokemonService: PokemonService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    pokemonService = new PokemonService(httpClientSpy);
  });

  it('should get all pokemon', (done: DoneFn) => {
    // ASSEMBLE
    const expectedPokemon: Pokemon[] = [
      {
        name: 'bulbasaur',
        url: '',
      },
    ];

    const expectedPokemonResponse: PokemonResponse = {
      count: 1,
      next: null,
      previous: null,
      results: expectedPokemon,
    };

    // ACT
    httpClientSpy.get.and.returnValue(of(expectedPokemonResponse));

    // ASSERT
    pokemonService.getPokemonList().subscribe({
      next: (pokemonRes) => {
        expect(pokemonRes)
          .withContext('expected pokemon response')
          .toEqual(expectedPokemonResponse);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
