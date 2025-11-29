import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FiliereDTO {
  titre: string;
  domaine: string;
  descriptionFormation: string;
  difficulte: number;
  tauxEmploi: number;
  tauxSatisfaction: number;
  salaireMin: number;
  salaireMax: number;
  dureeFormation: number;
  ecoles: string[];
  debouches: string[];
  competences: string[];
  temoignages: string;
}
export interface BourseConcoursDTO {
  id?: number;
  titre: string;
  type: string;
  typeBourse?: string | null;
  nombreBeneficiaires?: number;
  tauxAccepte?: number | null;
  dateLimite?: string; // ISO string
  criteres?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class FiliereService {
  private apiUrl = 'http://localhost:8081/api/filieres'; // ton URL back
  private baseUrl = 'http://localhost:8081/api/bourses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FiliereDTO[]> {
    return this.http.get<FiliereDTO[]>(this.apiUrl);
  }
  getAllBourses(): Observable<BourseConcoursDTO[]> {
    return this.http.get<BourseConcoursDTO[]>(this.baseUrl);
  }
}
