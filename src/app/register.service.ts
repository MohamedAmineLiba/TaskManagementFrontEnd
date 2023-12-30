import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl2 = environment.apiUrl2;
  constructor( private http:HttpClient) {}
  generateJwtRegister(nom: string, prenom: string, email : string , password : string , username : string){
    return this.http.post(this.apiUrl2, {
        nom : nom,
        prenom : prenom,
        password : password,
        username : username,
        email : email
    });
  }
}

