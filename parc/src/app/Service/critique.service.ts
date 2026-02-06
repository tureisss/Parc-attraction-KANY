import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Critique {
  critique_id?: number;
  attraction_id: number;
  texte: string;
  note: number;
  nom?: string;
  prenom?: string;
  anonyme?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CritiqueService {
  constructor(private http: HttpClient) {}

  getCritiques(attraction_id: number): Observable<Critique[]> {
    return this.http.get<Critique[]>(`https://api/critiques/${attraction_id}`);
  }

  addCritique(critique: Critique): Observable<any> {
    return this.http.post('https://api/critique', critique);
  }
}
