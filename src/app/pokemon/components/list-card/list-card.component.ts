import { Component, Input } from '@angular/core';
import { PokemonDetails } from '../../models';

@Component({
  selector: 'pokemon-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css'],
})
export class ListCardComponent {
  @Input() pokemon!: PokemonDetails;
  constructor() {}
}
