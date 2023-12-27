import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private apiUrl = 'http://localhost:8080/api/users/login';
  constructor( private http:HttpClient) {}
  generateJwt(username: string, password: string): Observable<string> {
    return this.http.post(this.apiUrl, {
      username: username,
      password: password
    }).pipe(
      map((response: any) => response.token)
    );
  }
}
