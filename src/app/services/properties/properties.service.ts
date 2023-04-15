import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Property } from 'src/app/objects/Property';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  env =environment;
  private apiUrl = `${this.env.API_PROPERTIES_URL}`;

  constructor(
    private http : HttpClient
  ) { }

  getProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(`${this.apiUrl}/logements`);
  }

  getPropertyById(id : string): Observable<Property>{
    return this.http.get<Property>(`${this.apiUrl}/logement?id=${id}`);
  }
}
