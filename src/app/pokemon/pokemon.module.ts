import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { StoreModule } from '@ngrx/store';
import * as fromPokemon from './state/pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './state/pokemon.effects';
import { PokemonRoutingModule } from './pokemon-routing.module';

@NgModule({
  declarations: [PokemonComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    StoreModule.forFeature(fromPokemon.name, fromPokemon.reducer),
    EffectsModule.forFeature([PokemonEffects]),
  ],
})
export class PokemonModule {}
