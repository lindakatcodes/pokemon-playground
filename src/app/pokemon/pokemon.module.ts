import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ListCardComponent } from './components/list-card/list-card.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { PokemonEffects } from './state/pokemon.effects';
import * as fromPokemon from './state/pokemon.reducer';
import { DetailsModalComponent } from './components/details-modal/details-modal.component';

@NgModule({
  declarations: [PokemonComponent, ListCardComponent, DetailsModalComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    StoreModule.forFeature(fromPokemon.name, fromPokemon.reducer),
    EffectsModule.forFeature([PokemonEffects]),
  ],
})
export class PokemonModule {}
