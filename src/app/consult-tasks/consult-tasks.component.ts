import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CardsComponent } from '../cards/cards.component';


@Component({
  selector: 'app-consult-tasks',
  standalone: true,
  imports: [CommonModule , RouterOutlet , HomeComponent, NavBarComponent , CardsComponent],
  templateUrl: './consult-tasks.component.html',
  styleUrl: './consult-tasks.component.css'
})
export class ConsultTasksComponent {

}
