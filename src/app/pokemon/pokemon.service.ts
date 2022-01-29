import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable, tap } from 'rxjs';
import { Pokemon, PokemonResponse } from './models';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonResponse>(`${environment.api}/pokemon`)
      .pipe(map((res) => res.results));
  }

  getPokemon(name: string) {}
}
