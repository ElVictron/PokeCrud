import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokemonService } from '../pokemon.services';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {
  pokemon: any;
  typeList: string = '';
  abilityList: string = '';


  constructor(
    private route: ActivatedRoute,
    private pokeService: PokemonService
  ) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokeService.getPokemonDetails(name).subscribe((data) => {
        this.pokemon = data;
        this.typeList = data.types.map((t: any) => t.type.name).join(', ');
        this.abilityList = data.abilities.map((a: any) => a.ability.name).join(', ');
      });

    }
  }
}
