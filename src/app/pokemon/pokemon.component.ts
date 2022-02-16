import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPokemon } from './state/pokemon.actions';
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadPokemon());
  }
}
