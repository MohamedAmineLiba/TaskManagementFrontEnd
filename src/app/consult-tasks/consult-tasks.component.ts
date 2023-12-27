import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-consult-tasks',
  standalone: true,
  imports: [CommonModule , RouterOutlet , HomeComponent, NavBarComponent],
  templateUrl: './consult-tasks.component.html',
  styleUrl: './consult-tasks.component.css'
})
export class ConsultTasksComponent {

}
