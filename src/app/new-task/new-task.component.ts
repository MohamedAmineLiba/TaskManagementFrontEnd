import { CommonModule , NgClass } from '@angular/common';
import { Component, OnInit , NgModule, inject, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Task } from '../type/Task';
import { UserDataService } from '../services/user-data.service';
import { UserResponse } from '../type/UserResponse';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule , RouterOutlet , HomeComponent, NavBarComponent , FormsModule , ReactiveFormsModule , RouterOutlet],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent{
  authenticated_user !: UserResponse;
  authenticatedUserTasks !: Task[];
  userForm !: FormGroup;
  username !: string;
  taskForm !: FormGroup
  constructor(private userData: UserDataService, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    /*this.userForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required]
    });*/
    this.taskForm = this.formBuilder.group({
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      status: [''],
      label: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.username = this.userData.getUsername();
    this.getUserAuth();
  }
  getUserAuth() {
    this.userService.getUserbyUsername(this.username).subscribe({
      next: (user: UserResponse) => {
        this.authenticatedUserTasks = user.tasks;
        this.authenticated_user = user;
        console.log(this.authenticated_user);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      // Assuming you have a TaskService to handle adding the task
      task.status="NOTYET";
      this.userService.addTask(this.username, task).subscribe({
        next: (reponse: UserResponse) => {
          console.log(reponse);
        },
        error: (err) => {
          console.log(err + "Task not added");
        }
      });
      // (response) => {
      //   console.log('Task added successfully:', response);
      //   // Add any additional logic (e.g., redirect, notify user)
      // },
      // (error) => {
      //   console.error('Error adding task:', error);
      //   // Handle the error (e.g., display an error message)
      // }

    } else {
      console.log('Form is invalid');
    }
  }
}
