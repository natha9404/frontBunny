import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from '../app/components/users/list-users/list-users.component'
import { LoginComponent } from './components/login/login.component';
import { ListTaskComponent } from './components/tasks/list-task/list-task.component';
import { UpdateTaskComponent } from './components/tasks/update-task/update-task.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { TasksUserComponent } from './components/users/tasks-user/tasks-user.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { AuthGuardService } from './services/AuthGuard/auth-guard.service';

const routes: Routes = [
  {path: 'listUsers', canActivate: [AuthGuardService], component: ListUsersComponent},
  {path: 'createUser', canActivate: [AuthGuardService], component: CreateUserComponent},
  {path: 'updateUser', canActivate: [AuthGuardService], component: UpdateUserComponent},
  {path: 'listTasks', canActivate: [AuthGuardService], component: ListTaskComponent},
  {path: 'updateTask', canActivate: [AuthGuardService], component: UpdateTaskComponent},
  {path: 'userTasks', canActivate: [AuthGuardService], component: TasksUserComponent},
  {path: 'login', component: LoginComponent},
  { path: '**', pathMatch:'full', redirectTo: 'listTasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
