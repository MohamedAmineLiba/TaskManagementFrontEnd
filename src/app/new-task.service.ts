import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtServiceLogin } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class NewTaskService {
  private _taskUrl = "http://localhost:8081/USER-SERVICES/api/users/{username}";

  constructor(private http: HttpClient, private authService: JwtServiceLogin) { }

  addTask(username: string, task: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.getRefreshToken()
      })
    };
    return this.http.post<any>(`${this._taskUrl}/${username}`, task, httpOptions);
  }
}
