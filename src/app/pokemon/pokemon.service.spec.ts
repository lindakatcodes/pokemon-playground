import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Pokemon, PokemonResponse } from './models';

import { PokemonService } from './pokemon.service';

fdescribe('PokemonService', () => {
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

    const expectedPokemonResponse: PokemonResponse = {
      count: 1,
      next: null,
      previous: null,
      results: expectedPokemon,
    };

    // ACT
    httpCLientSpy.get.and.returnValue(of(expectedPokemonResponse));

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
