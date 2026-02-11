import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

declare const $localize: (messageParts: TemplateStringsArray, ...expressions: any[]) => string;

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatButtonModule, MatCardModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  public formulaireAttractions: FormGroup[] = [];

  constructor(
    public attractionService: AttractionService, 
    public formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar
  ) {}
  
  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttraction().pipe(tap((attractions:AttractionInterface[]) => {
    this.formulaireAttractions = [];
    attractions.forEach(attraction => {
      this.formulaireAttractions.push(
        new FormGroup({
          attraction_id: new FormControl(attraction.attraction_id),
          nom: new FormControl(attraction.nom, [Validators.required]),
          description: new FormControl(attraction.description, [Validators.required]),
          difficulte: new FormControl(attraction.difficulte),
          visible: new FormControl(attraction.visible),
          image_url: new FormControl(attraction.image_url || ''),
          hauteur: new FormControl(attraction.hauteur),
          vitesse: new FormControl(attraction.vitesse),
          longueur: new FormControl(attraction.longueur),
          duree: new FormControl(attraction.duree),
          annee_construction: new FormControl(attraction.annee_construction)
        })
      );
    });
  }));

  public onSubmit(attractionFormulaire: FormGroup) {
    if (!attractionFormulaire.valid) {
      this._snackBar.open($localize`:@@adminRequiredFields:❌ Veuillez remplir tous les champs obligatoires`, undefined, { duration: 2000 });
      return;
    }
    
    this.attractionService.postAttraction(attractionFormulaire.getRawValue()).subscribe(result => {
      attractionFormulaire.patchValue({attraction_id: result.result});
      this._snackBar.open($localize`:@@adminSaveSuccess:✅ Enregistrement réussi`, undefined, { duration: 2000 });
    });
  }

  public addAttraction() {
    this.formulaireAttractions.push(
      new FormGroup({
        attraction_id: new FormControl(),
        nom: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        difficulte: new FormControl(1),
        visible: new FormControl(true),
        image_url: new FormControl(''),
        hauteur: new FormControl(),
        vitesse: new FormControl(),
        longueur: new FormControl(),
        duree: new FormControl(),
        annee_construction: new FormControl()
      })
    );
  }

  public deleteAttraction(index: number) {
    const attraction = this.formulaireAttractions[index];
    const attractionId = attraction.get('attraction_id')?.value;

    if (!attractionId) {
      // Nouvelle attraction non enregistrée
      this.formulaireAttractions.splice(index, 1);
      this._snackBar.open($localize`:@@adminFormDeleted:⚠️ Attraction supprimée du formulaire`, undefined, { duration: 2000 });
      return;
    }

    if (confirm($localize`:@@adminDeleteConfirm:Êtes-vous sûr de vouloir supprimer cette attraction? Toutes les critiques seront aussi supprimées.`)) {
      this.attractionService.deleteAttraction(attractionId).subscribe(
        () => {
          this.formulaireAttractions.splice(index, 1);
          this._snackBar.open($localize`:@@adminDeleteSuccess:✅ Attraction supprimée`, undefined, { duration: 2000 });
          // Recharger les attractions
          window.location.reload();
        },
        (error: any) => {
          this._snackBar.open($localize`:@@adminDeleteError:❌ Erreur lors de la suppression`, undefined, { duration: 2000 });
        }
      );
    }
  }
}
