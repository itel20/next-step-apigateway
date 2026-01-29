import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from './publication.model';

@Injectable({ providedIn: 'root' })
export class PublicationService {
  private apiUrl = 'http://localhost:8081/api/publications';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl);
  }

  create(publication: Publication): Observable<Publication> {
    return this.http.post<Publication>(this.apiUrl, publication);
  }
}
