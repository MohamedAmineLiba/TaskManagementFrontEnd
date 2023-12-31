import { CommonModule, NgClass } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginResponse } from '../type/LoginReponse';
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginPageComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor( private router: Router , private userData : UserDataService ,private formBuilder: FormBuilder , private userService: UserService , private route:ActivatedRoute) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
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
 
  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.authenticate(this.loginForm.value).subscribe({
        next: (value : LoginResponse) => {
          console.log(value);
          this.userData.setUsername(value.user.username);
          
          this.router.navigate(['/NewTask']);
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      console.log('Form is invalid');
    }
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
