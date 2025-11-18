import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Filiere } from './orientation.model';

@Injectable({
  providedIn: 'root',
})
export class FilieresService {
  private baseUrl = 'http://localhost:8081/api/filieres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(this.baseUrl).pipe(catchError((err: unknown) => throwError(() => err)));
  }

  getOne(id: number): Observable<Filiere> {
    return this.http.get<Filiere>(`${this.baseUrl}/${id}`).pipe(catchError((err: unknown) => throwError(() => err)));
  }

  create(filiere: Filiere): Observable<Filiere> {
    return this.http.post<Filiere>(this.baseUrl, filiere).pipe(catchError((err: unknown) => throwError(() => err)));
  }

  update(id: number, filiere: Filiere): Observable<Filiere> {
    return this.http.put<Filiere>(`${this.baseUrl}/${id}`, filiere).pipe(catchError((err: unknown) => throwError(() => err)));
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/${id}`).pipe(catchError((err: unknown) => throwError(() => err)));
  }
}
