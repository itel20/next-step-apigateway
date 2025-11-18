import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filiere } from './orientation.model';

@Injectable({
  providedIn: 'root',
})
export class FilieresService {
  private baseUrl = 'http://localhost:8080/api/filieres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(this.baseUrl);
  }

  getOne(id: number): Observable<Filiere> {
    return this.http.get<Filiere>(`${this.baseUrl}/${id}`);
  }

  create(filiere: Filiere): Observable<Filiere> {
    return this.http.post<Filiere>(this.baseUrl, filiere);
  }

  update(id: number, filiere: Filiere): Observable<Filiere> {
    return this.http.put<Filiere>(`${this.baseUrl}/${id}`, filiere);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
