import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from '../app/components/users/list-users/list-users.component'
import { ListTaskComponent } from './components/tasks/list-task/list-task.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
const routes: Routes = [
  {path: 'listUsers', component: ListUsersComponent},
  {path: 'createUser', component: CreateUserComponent},
  {path: 'updateUser', component: UpdateUserComponent},
  {path: 'listTasks', component: ListTaskComponent},
  { path: '**', pathMatch:'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
