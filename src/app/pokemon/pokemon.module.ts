import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { StoreModule } from '@ngrx/store';
import * as fromPokemon from './state/pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './state/pokemon.effects';

@NgModule({
  declarations: [PokemonComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromPokemon.name, fromPokemon.reducer),
    EffectsModule.forFeature([PokemonEffects]),
  ],
})
export class PokemonModule {}
