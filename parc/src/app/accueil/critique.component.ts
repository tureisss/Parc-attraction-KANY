import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CritiqueService, Critique } from '../Service/critique.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-critique',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatIconModule],
  templateUrl: './critique.component.html',
  styleUrl: './critique.component.scss'
})
export class CritiqueComponent {
  @Input() attractionId!: number | null;
  critiques$!: Observable<Critique[]>;
  form: FormGroup;
  showForm = false;

  constructor(private critiqueService: CritiqueService, private fb: FormBuilder) {
    this.form = this.fb.group({
      texte: ['', Validators.required],
      note: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      nom: [''],
      prenom: [''],
      anonyme: [false]
    });
  }

  ngOnInit() {
    this.loadCritiques();
  }

  loadCritiques() {
    if (this.attractionId !== null && this.attractionId !== undefined) {
      this.critiques$ = this.critiqueService.getCritiques(this.attractionId);
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submit() {
    if (this.form.valid) {
      const critique: Critique = {
        ...this.form.value,
        attraction_id: this.attractionId
      };
      this.critiqueService.addCritique(critique).subscribe(() => {
        this.loadCritiques();
        this.form.reset({note: 5, anonyme: false});
        this.showForm = false;
      });
    }
  }
}
