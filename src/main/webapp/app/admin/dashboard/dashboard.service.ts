import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StatsReponse {
  totalEtudiants: number;
  totalEleves: number;
  totalConseillers: number;
  totalAll: number;
}

export interface StatsReponses {
  totalBourceConcours: number;
  totalFiliere: number;
  totalEtablissement: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getStats(): Observable<StatsReponse> {
    return this.http.get<StatsReponse>(`${this.apiUrl}/stats`);
  }

  getStatistics(): Observable<StatsReponses> {
    return this.http.get<StatsReponses>(`${this.apiUrl}/statistics`);
  }
}
