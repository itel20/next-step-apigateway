import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from './publication.model';

@Injectable({ providedIn: 'root' })
export class PublicationService {
  private apiUrl = 'http://localhost:8081/api/publications';
  private apiUrls = 'http://localhost:8081/api/publication-shares';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl);
  }

  create(publication: Publication): Observable<Publication> {
    return this.http.post<Publication>(this.apiUrl, publication);
  }
  sharePublication(publicationId: number, userId: number, userType: string): Observable<any> {
    return this.http.post(`${this.apiUrls}/publications/${publicationId}/share/${userId}/${userType}`, {});
  }
  getAllShares(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrls);
  }
}
