import { CommonModule, NgClass } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginPageComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string;
  password: string;
  hidePassword = true;

  constructor( private jwtService : JwtService , private router: Router) { 
    this.username = '';
    this.password = '';
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  private showErrorMessage(message: string) {
    // Show error message in a popup window
    alert(message);
  }
  onSubmit() {

    this.jwtService.generateJwt(this.username, this.password).subscribe({
      next:(Token) => {
       
          console.log(Token);
          this.router.navigate(['/home']);
      },
      error:(error) => {
        console.error(error);
        alert('Username or password is wrong');
      }
    }
     
    );
  }
}
