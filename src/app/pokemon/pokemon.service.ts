import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonResponse } from './models';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${environment.api}/pokemon`);
  }

  getPokemon(name: string) {}
}
