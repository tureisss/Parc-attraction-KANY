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

  get leftAttraction(): AttractionInterface | undefined {
    return this.attractions.find(a => a.attraction_id === this.leftId);
  }

  get rightAttraction(): AttractionInterface | undefined {
    return this.attractions.find(a => a.attraction_id === this.rightId);
  }

  isLeftWinner(leftValue: number | null | undefined, rightValue: number | null | undefined): boolean {
    if (!leftValue || !rightValue) return false;
    return leftValue > rightValue;
  }

  isRightWinner(leftValue: number | null | undefined, rightValue: number | null | undefined): boolean {
    if (!leftValue || !rightValue) return false;
    return rightValue > leftValue;
  }
}
