import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Stats1 {
  totalAll: number;
}

export interface Stats2 {
  totalBourceConcours: number;
  totalFiliere: number;
  totalEtablissement: number;
}

@Injectable({
  providedIn: 'root',
})
export class StatistiquesService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getStats(): Observable<Stats1> {
    return this.http.get<Stats1>(`${this.apiUrl}/stats1`);
  }

  getStatistics(): Observable<Stats2> {
    return this.http.get<Stats2>(`${this.apiUrl}/stats2`);
  }
}
