import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApiUserService } from '../../../services/User/api-user.service'
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['id','name','edit', 'list', 'delete'];
  dataSource: any;
  expandedElement = false;
  users: any;
  email: string;
  create: boolean =false;
  customerData:any;
  nameDelet: string = '';
  idDelet: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiU: ApiUserService, public dialog: MatDialog) {
    console.log('Hola ocnstructor')
    this.getUsers();
  }

  ngOnInit() {
  }

  getUsers() {
    console.log('get users')
    this.apiU.getUsers()
      .subscribe((data: any) => {
        this.users = data.data.info;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }, (errorServicio) => {
        console.log('HOLITAAAS')
        console.log(errorServicio);
      });
  }

  
  createUser(){
    this.create = true;
  }

  public closeUser(){
    this.create = false
    this.getUsers();
  }

  nameDelete(name,id){
    this.nameDelet = name
    this.idDelet = id
  }

  deleteUser(user_id){

    this.apiU.deleteUser(user_id)
      .subscribe((data: any) => {
        console.log("eliminado")
        document.getElementById("exampleModal").click();
        this.getUsers();
      }, (errorServicio) => {
        console.log('HOLITAAAS')
        console.log(errorServicio);
      });
  }

}
