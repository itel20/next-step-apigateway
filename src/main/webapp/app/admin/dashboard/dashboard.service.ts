import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- Type pour /api/stats ---
export interface StatsReponse {
  totalEtudiants: number;
  totalEleves: number;
  totalConseillers: number;
  totalAll: number;
}

// --- Type pour /api/statistics ---
export interface StatsReponses {
  totalBourceConcours: number;
  totalFiliere: number;
  totalEtablissement: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  // Récupère les stats des étudiants, élèves, conseillers
  getStats(): Observable<StatsReponse> {
    return this.http.get<StatsReponse>(`${this.apiUrl}/stats`);
  }

  // Récupère les stats des bourses, filières, établissements
  getStatistics(): Observable<StatsReponses> {
    return this.http.get<StatsReponses>(`${this.apiUrl}/statistics`);
  }
}
