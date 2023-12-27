import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-manage-tasks',
  standalone: true,
  imports: [CommonModule , RouterOutlet , HomeComponent, NavBarComponent],
  templateUrl: './manage-tasks.component.html',
  styleUrl: './manage-tasks.component.css'
})
export class ManageTasksComponent {

}
