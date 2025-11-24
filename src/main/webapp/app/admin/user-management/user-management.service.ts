import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEleve } from './user-management.model';

@Injectable({ providedIn: 'root' })
export class EleveService {
  private apiUrl = 'http://localhost:8081/api/eleves';

  constructor(private http: HttpClient) {}

  // ==========================
  // Public methods
  // ==========================

  getAll(eagerload = true, page?: number, size?: number): Observable<IEleve[]> {
    let params = new HttpParams().set('eagerload', eagerload.toString());
    if (page !== undefined) params = params.set('page', page.toString());
    if (size !== undefined) params = params.set('size', size.toString());

    return this.http.get<IEleve[]>(this.apiUrl, { params, headers: this.getAuthHeaders() });
  }

  getOne(id: number): Observable<IEleve> {
    return this.http.get<IEleve>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  create(eleve: IEleve): Observable<IEleve> {
    return this.http.post<IEleve>(this.apiUrl, eleve, { headers: this.getAuthHeaders() });
  }

  update(id: number, eleve: IEleve): Observable<IEleve> {
    return this.http.put<IEleve>(`${this.apiUrl}/${id}`, eleve, { headers: this.getAuthHeaders() });
  }

  partialUpdate(id: number, eleve: Partial<IEleve>): Observable<IEleve> {
    return this.http.patch<IEleve>(`${this.apiUrl}/${id}`, eleve, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  search(query: string, page?: number, size?: number): Observable<IEleve[]> {
    let params = new HttpParams().set('query', query);
    if (page !== undefined) params = params.set('page', page.toString());
    if (size !== undefined) params = params.set('size', size.toString());

    return this.http.get<IEleve[]>(`${this.apiUrl}/_search`, { params, headers: this.getAuthHeaders() });
  }

  countBySerie(serie: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`, {
      params: new HttpParams().set('serie', serie),
      headers: this.getAuthHeaders(),
    });
  }

  updateStatut(id: number, statut: string): Observable<IEleve> {
    return this.partialUpdate(id, { user: { statut } });
  }

  // ==========================
  // Private methods
  // ==========================

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('id_token') ?? ''; // nullish coalescing
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
}
