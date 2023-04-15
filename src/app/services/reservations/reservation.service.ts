import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/objects/Reservation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  env =environment;
  private apiUrl = `${this.env.API_RESERVATIONS_URL}`;

  constructor(
    private http : HttpClient
  ) { }

  postReservation(reservation: Reservation): Observable<Reservation>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<Reservation>(`${this.apiUrl}/reservations`, reservation, {headers})
  }

  getLogementReservations(id: string ) : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/logement/reservations?logement-id=${id}`)
  }

  getUserReservations(): Observable<Reservation[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>(`${this.apiUrl}/reservations/me`, {headers})
  }

  deleteReservation(res : Reservation): Observable<Reservation>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete<Reservation>(`${this.apiUrl}/reservations?reservation-id=${res.id}`, {headers})
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<any>(`${this.apiUrl}/reservations`)
  }
}
