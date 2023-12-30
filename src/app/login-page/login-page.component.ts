import { CommonModule, NgClass } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { JwtServiceLogin } from '../jwt.service';
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

  constructor( private jwtServiceLogin : JwtServiceLogin, private router: Router) { 
    this.username = '';
    this.password = '';
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  navigateToRegister(){
    this.router.navigate(['/register']);
  }

  private showErrorMessage(message: string) {
    // Show error message in a popup window
    alert(message);
  }
 
  onLogin() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.jwtServiceLogin.loginUser(user).subscribe(
      res => {
        console.log(res);
        this.jwtServiceLogin.setUsername(res.user.username);
        this.router.navigate(['/home']);
      },
      err => {
        console.error(err);
        alert('Username or password is wrong');
      }
    );
  }

 /* onSubmit() {

    this.jwtServiceLogin.generateJwtLogin(this.username, this.password).subscribe({
      next:(token) => {
          console.log(token);
          localStorage.setItem('token', token);
          this.router.navigate(['/home']);
      },
      error:(error) => {
        console.error(error);
        alert('Username or password is wrong');
      }
    });
    
  }*/

}
