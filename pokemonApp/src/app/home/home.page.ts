import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngFor and titlecase pipe
import { Router } from '@angular/router'; // For navigation
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone'; // Corrected standalone imports
import { PokemonService } from './pokemon.services'; // Import PokemonService

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, // Provides *ngFor, titlecase pipe, etc.
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButton,
  ],
})
export class HomePage implements OnInit {
  pokemons: { name: string, url: string }[] = []; // Adjusted type to include URL if needed from API
  private offset = 0;
  private limit = 20;

  constructor(
    private router: Router,
    private pokemonService: PokemonService // Inject PokemonService
  ) {}

  ngOnInit() {
    this.loadInitialPokemons();
  }

  loadInitialPokemons() {
    this.offset = 0; // Reset offset for initial load
    this.pokemonService.getPokemonList(this.offset, this.limit).subscribe({
      next: (response) => {
        this.pokemons = response.results;
        this.offset += this.limit;
      },
      error: (err) => {
        console.error('Error loading initial Pokémon list:', err);
        // Optionally, set a message on the UI for the user
      }
    });
  }

  viewDetails(pokemonName: string): void {
    console.log('View details for:', pokemonName);
    this.router.navigate(['/details', pokemonName]);
  }
  
  loadMore(): void {
    this.pokemonService.getPokemonList(this.offset, this.limit).subscribe({
      next: (response) => {
        if (response && response.results) {
          this.pokemons = [...this.pokemons, ...response.results];
          this.offset += this.limit;
          console.log('Loaded more Pokémon');
        }
      },
      error: (err) => {
        console.error('Error loading more Pokémon:', err);
      }
    });
  }
}
