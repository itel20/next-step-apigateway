import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtablissementDTO } from './etablissement.model';

@Injectable({
  providedIn: 'root',
})
export class EtablissementService {
  private apiUrl = 'http://localhost:8081/api/etablissements';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EtablissementDTO[]> {
    return this.http.get<EtablissementDTO[]>(this.apiUrl);
  }

  getOne(id: number): Observable<EtablissementDTO> {
    return this.http.get<EtablissementDTO>(`${this.apiUrl}/${id}`);
  }

  create(dto: EtablissementDTO): Observable<EtablissementDTO> {
    return this.http.post<EtablissementDTO>(this.apiUrl, dto);
  }

  update(id: number, dto: EtablissementDTO): Observable<EtablissementDTO> {
    return this.http.put<EtablissementDTO>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.apiUrl}/${id}`);
  }
}
