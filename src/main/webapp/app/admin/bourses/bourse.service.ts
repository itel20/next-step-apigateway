import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BourseConcours } from './bourse.model';

@Injectable({ providedIn: 'root' })
export class BourseConcoursService {
  private resourceUrl = 'http://localhost:8081/api/bourses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<BourseConcours[]> {
    return this.http.get<BourseConcours[]>(this.resourceUrl);
  }

  get(id: number): Observable<BourseConcours> {
    return this.http.get<BourseConcours>(`${this.resourceUrl}/${id}`);
  }

  create(bourse: BourseConcours): Observable<BourseConcours> {
    return this.http.post<BourseConcours>(this.resourceUrl, bourse);
  }

  update(id: number, bourse: BourseConcours): Observable<BourseConcours> {
    return this.http.put<BourseConcours>(`${this.resourceUrl}/${id}`, bourse);
  }

  delete(id: number): Observable<{}> {
    // ⬅️ Pas void !!!
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }
}
