import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceLogin {
  private _loginUrl = 'http://localhost:8081/USER-SERVICES/api/users/login';
  private username: string = '';

  constructor(private http: HttpClient) { }

  setUsername(username: string) {
    this.username = username;
  }
  
  getUsername() {
    return this.username;
  }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user)
      .pipe(
        tap((res: any) => {
          if (res && res.refreshToken) {
            this.setRefreshToken(res.refreshToken);
          }
        })
      );
  }

  setRefreshToken(token: string) {
    document.cookie = `refreshToken=${token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  }

  getRefreshToken() {
    const refreshTokenCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('refreshToken'));
    if (refreshTokenCookie) {
      const cookieValue = refreshTokenCookie.split('=')[1];
      return cookieValue;
    } else {
      // Handle the case where the refreshToken cookie doesn't exist
      console.error('Refresh token cookie not found');
      return null;
    }
  }
  
}