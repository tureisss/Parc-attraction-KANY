import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
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
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule, CritiqueComponent, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule],
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
  
  // Map pour suivre l'état d'affichage des critiques par attraction
  public showCritiques: { [key: number]: boolean } = {};

  constructor(
    public attractionService: AttractionService
  ) {}

  toggleCritiques(attractionId: number | null) {
    if (typeof attractionId !== 'number') return;
    this.showCritiques[attractionId] = !this.showCritiques[attractionId];
  }

  applyFilters(attractions: AttractionInterface[]): AttractionInterface[] {
    let filtered = [...attractions];

    // Filtre par recherche
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.nom.toLowerCase().includes(query) || 
        a.description.toLowerCase().includes(query)
      );
    }

    // Filtre par difficulté
    if (this.selectedDifficulty !== null) {
      filtered = filtered.filter(a => a.difficulte === this.selectedDifficulty);
    }

    // Tri
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
    this.attractions = new Observable(observer => {
      observer.next(this.applyFilters(this.allAttractions));
      observer.complete();
    });
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedDifficulty = null;
    this.sortBy = 'nom';
    this.onFilterChange();
  }
}
