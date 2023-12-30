import { CommonModule , NgClass } from '@angular/common';
import { Component, OnInit , NgModule, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTaskService } from '../new-task.service';
import { JwtServiceLogin } from '../jwt.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule , RouterOutlet , HomeComponent, NavBarComponent , FormsModule , ReactiveFormsModule , RouterOutlet],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent{
  label: string = '';
  description: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private newTaskService: NewTaskService, private authService: JwtServiceLogin) { }

  onSubmit() {
    const task = {
      label: this.label,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate
    };
    const username = this.authService.getUsername(); // get the username from the AuthService
    this.newTaskService.addTask(username, task).subscribe(
      res => {
        console.log(res);
        alert('Task Added Successfully');
        // Navigate to another page or show a success message
  
        // Clear the form inputs
        this.label = '';
        this.description = '';
        this.startDate = null;
        this.endDate = null;
      },
      err => {
        console.error(err);
        // Handle task creation error here
        alert('An error was occured');
      }
    );
  }
}
