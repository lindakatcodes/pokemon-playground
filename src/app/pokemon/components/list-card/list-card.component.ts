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

  setTypeStyle(type: string): string {
    const background = `var(--${type})`;
    let text = '';
    // if bg color is too dark, change text color
    // dark colors are red / darkblue / darkgray
    switch (type) {
      case 'fighting':
      case 'rock':
      case 'fire':
      case 'psychic':
      case 'dark':
      case 'water':
      case 'poison':
        text = `var(--white)`;
        break;
      default:
        text = `var(--black)`;
        break;
    }
    return `background-color: ${background}; color: ${text}`;
  }
}
