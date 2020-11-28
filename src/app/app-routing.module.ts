import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from '../app/components/users/list-users/list-users.component'
import { ListTaskComponent } from './components/tasks/list-task/list-task.component';
const routes: Routes = [
  {path: 'listUsers', component: ListUsersComponent},
  {path: 'listTasks', component: ListTaskComponent},
  { path: '**', pathMatch:'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
