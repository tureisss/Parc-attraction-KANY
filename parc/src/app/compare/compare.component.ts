import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AttractionService } from '../Service/attraction.service';
import { AttractionInterface } from '../Interface/attraction.interface';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatCardModule],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.scss'
})
export class CompareComponent implements OnInit {
  public attractions: AttractionInterface[] = [];
  public leftId: number | null = null;
  public rightId: number | null = null;

  constructor(private attractionService: AttractionService) {}

  ngOnInit(): void {
    this.attractionService.getAllAttraction().subscribe(attractions => {
      this.attractions = attractions;
      if (this.attractions.length >= 2 && this.leftId === null && this.rightId === null) {
        this.leftId = this.attractions[0].attraction_id;
        this.rightId = this.attractions[1].attraction_id;
      }
    });
  }

  /**
   * Génère le nom du fichier SVG à partir du nom de l'attraction
   */
  getImageName(nom: string | undefined): string {
    if (!nom) return 'default-coaster';
    return nom
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  get leftAttraction(): AttractionInterface | undefined {
    return this.attractions.find(a => a.attraction_id === this.leftId);
  }

  get rightAttraction(): AttractionInterface | undefined {
    return this.attractions.find(a => a.attraction_id === this.rightId);
  }

  /**
   * Détermine si la valeur de gauche est supérieure à celle de droite
   * Gère les types null/undefined pour éviter les erreurs de compilation
   */
  isLeftWinner(leftValue: number | null | undefined, rightValue: number | null | undefined): boolean {
    if (leftValue === null || leftValue === undefined || rightValue === null || rightValue === undefined) return false;
    return leftValue > rightValue;
  }

  /**
   * Détermine si la valeur de droite est supérieure à celle de gauche
   */
  isRightWinner(leftValue: number | null | undefined, rightValue: number | null | undefined): boolean {
    if (leftValue === null || leftValue === undefined || rightValue === null || rightValue === undefined) return false;
    return rightValue > leftValue;
  }
}