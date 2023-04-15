import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  env =environment;
  private apiUrl = `${this.env.API_USER_URL}`;
  logout() {
    localStorage.removeItem('token');
  }
  private user: any;
  constructor(
    private http : HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  login(username : string, password : string): Observable<any>{
    var body = {
      "username" : username,
      "password" : password
    }
    return this.http.post<any>(`${this.apiUrl}/auth/login`, body)
  }

  register(username : string, email: string, password : string): Observable<any>{
    var body = {
      "username" : username,
      "email" : email,
      "password" : password
    }
    return this.http.post<any>(`${this.apiUrl}/auth/register`, body)
  }
  public setUser(token: string): void {
    this.user = this.jwtHelper.decodeToken(token);
  }

  public getUsername(): string {
    if(this.user == null){
      return "";
    }
    return this.user.sub;
  }

  public getRole(): string {
    if(this.user == null){
      return "";
    }
    return this.user.role;
  }

  getToken(): string | null  {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    var token = this.getToken();
    if(token == null){
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  restaureLogin(){


    if(this.isLoggedIn()){
      const token = this.getToken() as string;
      this.setUser(token)
    }else{
      localStorage.removeItem('token');
      this.user = null;
    }
  }
}
