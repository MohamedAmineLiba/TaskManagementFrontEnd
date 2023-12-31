import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { ConsultTasksComponent } from './consult-tasks/consult-tasks.component';


export const routes: Routes = [
    { path : '' , redirectTo : 'login' , pathMatch : 'full'},
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterComponent },
    { path :'home' , component : HomeComponent},
    { path: 'NewTask', component : NewTaskComponent},
    { path: 'ConsultTasks', component : ConsultTasksComponent},
    { path: 'ManageTasks', component : ManageTasksComponent}
];

