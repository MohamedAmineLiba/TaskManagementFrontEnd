import { CommonModule , NgClass } from '@angular/common';
import { Component , NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Token } from '@angular/compiler';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username : string;
  password : string;
  nom : string;
  prenom : string;
  email : string;
  
  constructor(private jwtServiceRegister : RegisterService , private router: Router) { 
    this.username = '';
    this.password = '';
    this.nom = '';
    this.prenom = '';
    this.email = '';
  }

  navigateToRegister() {
    this.router.navigate(['/login']);
  }


  onRegister() {
    this.jwtServiceRegister.generateJwtRegister( this.nom , this.prenom , this.email , this.username , this.password).subscribe({
      next:(response) => {
               console.log(response);
               this.router.navigate(['/login']);
               
      },
      error:(error) => {
        console.error('Erreur lors de l\'inscription', error);
        this.router.navigate(['/register']);
      }
    })
  }

}
