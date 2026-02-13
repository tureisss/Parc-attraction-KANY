import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable, map, of } from 'rxjs'; // Ajout de 'of' pour simplifier onFilterChange
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CritiqueComponent } from './critique.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterModule, 
    CritiqueComponent, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatChipsModule
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  // Filtres
  public searchQuery: string = '';
  public selectedDifficulty: number | null = null;
  public sortBy: string = 'nom';
  
  public allAttractions: AttractionInterface[] = [];
  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttraction().pipe(
    map(attractions => {
      this.allAttractions = attractions;
      return this.applyFilters(attractions);
    })
  );
  
  public showCritiques: { [key: number]: boolean } = {};

  constructor(
    public attractionService: AttractionService
  ) {}

  /**
   * Transforme le nom de l'attraction pour correspondre au fichier SVG
   * Exemple: "Silver Star" -> "silver-star"
   */
  getImageName(nom: string): string {
    if (!nom) return 'default-coaster';
    return nom
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')            // Remplace les espaces par des tirets
      .normalize("NFD")                // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, ""); // Supprime les accents
  }

  toggleCritiques(attractionId: number | null) {
    if (typeof attractionId !== 'number') return;
    this.showCritiques[attractionId] = !this.showCritiques[attractionId];
  }

  applyFilters(attractions: AttractionInterface[]): AttractionInterface[] {
    let filtered = [...attractions];

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.nom.toLowerCase().includes(query) || 
        a.description.toLowerCase().includes(query)
      );
    }

    if (this.selectedDifficulty !== null) {
      filtered = filtered.filter(a => a.difficulte === this.selectedDifficulty);
    }

    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'nom':
          return a.nom.localeCompare(b.nom);
        case 'difficulte':
          return a.difficulte - b.difficulte;
        case 'annee':
          return (b.annee_construction || 0) - (a.annee_construction || 0);
        case 'vitesse':
          return (b.vitesse || 0) - (a.vitesse || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }

  onFilterChange() {
    this.attractions = of(this.applyFilters(this.allAttractions));
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedDifficulty = null;
    this.sortBy = 'nom';
    this.onFilterChange();
  }
}