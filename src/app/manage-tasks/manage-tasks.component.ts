import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { UserService } from '../services/user.service';
import { UserDataService } from '../services/user-data.service';
import { Task } from '../type/Task';
import { UserResponse } from '../type/UserResponse';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { urlencoded } from 'express';
import { NewEditedTaskComponent } from "../new-edited-task/new-edited-task.component";

@Component({
    selector: 'app-manage-tasks',
    standalone: true,
    templateUrl: './manage-tasks.component.html',
    styleUrl: './manage-tasks.component.css',
    imports: [CommonModule, RouterOutlet, HomeComponent, NavBarComponent, CommonModule, NewEditedTaskComponent]
})
export class ManageTasksComponent implements OnInit{
  authenticated_user !: UserResponse;
  authenticatedUserTasks !: Task[];
  userForm !: FormGroup;
  username !: string;
  taskForm !: FormGroup;
  editedTask !: Task;
  isEditDialogVisible: boolean = false;

  constructor(private userData: UserDataService, private formBuilder: FormBuilder, private userService: UserService) { }
  ngOnInit(): void {
    this.username = localStorage.getItem("username") || "";
    this.getUserTask(this.username);
  }
  

  deleteTask(idtask : number | undefined){
    if(idtask !== undefined){
      this.userService.deleteUserTask(this.username,idtask).subscribe({
        next:(res : string)=>{
          console.log("task deleted");
        },
        error:(err) => {
          console.log(err);
          this.getUserTask(this.username);
        }
      })
    }else{
      alert('Task ID is undefined');
    }
  }
  getUserTask(username:string){
    this.userService.getUserbyUsername(username).subscribe({
      next : (response : UserResponse)=>{
        this.authenticatedUserTasks = response.tasks;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  saveNewEditedTask() {
    this.updateTask(this.editedTask.id,this.editedTask);
    this.closeNewEditDialog();
  }
  openEditDialog(task: Task) {
    this.editedTask = task;
    this.isEditDialogVisible = true;
  }

  closeNewEditDialog() {
    this.isEditDialogVisible = false;
  }


  updateTask(id : number | undefined , task : Task) {
    if(id === undefined){
      return;
    }
    this.userService.updateUserTask(this.username,id,task).subscribe({
      next: (response:Task) => {
        this.getUserTask(this.username);
      },
      error : (err)=>{
        console.log(err);
      }
    })
}














}