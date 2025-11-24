import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEleve } from './user-management.model';

@Injectable({ providedIn: 'root' })
export class EleveService {
  private apiUrl = 'http://localhost:8081/api/eleves';

  constructor(private http: HttpClient) {}

  // ✅ Récupérer tous les élèves (avec pagination si besoin)
  getAll(eagerload = true, page?: number, size?: number): Observable<IEleve[]> {
    let params = new HttpParams().set('eagerload', eagerload.toString());
    if (page !== undefined) params = params.set('page', page.toString());
    if (size !== undefined) params = params.set('size', size.toString());
    return this.http.get<IEleve[]>(this.apiUrl, { params });
  }

  // ✅ Récupérer un élève par id
  getOne(id: number): Observable<IEleve> {
    return this.http.get<IEleve>(`${this.apiUrl}/${id}`);
  }

  // ✅ Créer un nouvel élève
  create(eleve: IEleve): Observable<IEleve> {
    return this.http.post<IEleve>(this.apiUrl, eleve);
  }

  // ✅ Mettre à jour un élève existant
  update(id: number, eleve: IEleve): Observable<IEleve> {
    return this.http.put<IEleve>(`${this.apiUrl}/${id}`, eleve);
  }

  // ✅ Mise à jour partielle d'un élève (PATCH)
  partialUpdate(id: number, eleve: Partial<IEleve>): Observable<IEleve> {
    return this.http.patch<IEleve>(`${this.apiUrl}/${id}`, eleve);
  }

  // ✅ Supprimer un élève
  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/${id}`);
  }

  // ✅ Rechercher des élèves
  search(query: string, page?: number, size?: number): Observable<IEleve[]> {
    let params = new HttpParams().set('query', query);
    if (page !== undefined) params = params.set('page', page.toString());
    if (size !== undefined) params = params.set('size', size.toString());
    return this.http.get<IEleve[]>(`${this.apiUrl}/_search`, { params });
  }

  // ✅ Compter les élèves par série
  countBySerie(serie: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`, { params: new HttpParams().set('serie', serie) });
  }

  // ✅ Mise à jour du statut (toggle actif/suspendu)
  updateStatut(id: number, statut: string): Observable<IEleve> {
    return this.partialUpdate(id, { user: { statut } });
  }
}
