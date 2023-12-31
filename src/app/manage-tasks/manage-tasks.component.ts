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
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-tasks',
  standalone: true,
  imports: [CommonModule , RouterOutlet , HomeComponent, NavBarComponent, CommonModule],
  templateUrl: './manage-tasks.component.html',
  styleUrl: './manage-tasks.component.css'
})
export class ManageTasksComponent{
  authenticated_user !: UserResponse;
  authenticatedUserTasks !: Task[];
  userForm !: FormGroup;
  username !: string;
  taskForm !: FormGroup;

  constructor(private userData: UserDataService, private formBuilder: FormBuilder, private userService: UserService,private modalService: NgbModal) { }
  openDialog(username:string,task: Task): void {
    const modalRef = this.modalService.open(TaskDialogComponent, { size: 'lg' });
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.username = username;
  }

  deleteTask(idtask : number | undefined){
    if(idtask !== undefined){
      this.userService.deleteUserTask(this.username,idtask).subscribe({
        next:(res : string)=>{
          console.log("task deleted");
        },
        error:(err) => {
          console.log(err);
        }
      })
    }else{
      alert('Task ID is undefined');
    }
  }
}