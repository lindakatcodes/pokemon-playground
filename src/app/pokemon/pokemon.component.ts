import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadMorePokemon, loadPokemon } from './state/pokemon.actions';
import {
  selectPokemonDetailsList,
  selectPokemonList,
} from './state/pokemon.reducer';
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  pokemonList$ = this.store.select(selectPokemonList);
  pokemonDetails$ = this.store.select(selectPokemonDetailsList);
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadPokemon({ increaseCountBy: 10 }));
  }

  loadMore() {
    this.store.dispatch(loadMorePokemon({ increaseCountBy: 10 }));
  }
}
