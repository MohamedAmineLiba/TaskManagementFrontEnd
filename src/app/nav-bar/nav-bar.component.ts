import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private router : Router){}

  LoGout() {
    this.router.navigate(['/']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToNewTask(){
    this.router.navigate(['/NewTask'])
  }

  navigateToConsultTask(){
    this.router.navigate(['/ConsultTasks'])
  }

  navigateToManageTask(){
    this.router.navigate(['/ManageTasks'])
  }

}
