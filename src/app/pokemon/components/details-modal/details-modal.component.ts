import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonDetails } from '../../models';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css'],
})
export class DetailsModalComponent {
  pokemon = this.data.selectedPokemon;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { selectedPokemon: PokemonDetails }
  ) {}
}
