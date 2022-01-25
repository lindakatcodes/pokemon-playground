import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { heroesFeature } from './state/heroes.reducer';
import { HeroesEffects } from './state/heroes.effects';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeroesRoutingModule,
    StoreModule.forFeature(heroesFeature),
    EffectsModule.forFeature([HeroesEffects]),
  ],
})
export class HeroesModule {}
