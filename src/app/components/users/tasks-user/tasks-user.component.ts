import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ApiTaskService } from 'src/app/services/Task/api-task.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-tasks-user',
  templateUrl: './tasks-user.component.html',
  styleUrls: ['./tasks-user.component.css']
})
export class TasksUserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'user_name', 'state', 'options'];
  dataSource: any;
  expandedElement = false;
  tasks: any;
  create: boolean = false;
  descriptionDelet: string = '';
  idDelet: number;
  user_id: any;
  customerData: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiT: ApiTaskService) {
    console.log("hstory", history.state)
    this.user_id = history.state.id
    this.getUserTask()
  }

  ngOnInit() {
  }

  getUserTask() {

    this.customerData = {
      "task": {
        "user_id": this.user_id
      }
    }

    console.log(this.customerData)
    this.apiT.getTaskUser(this.customerData)
      .subscribe((data: any) => {
        this.tasks = data.data.info
        console.log(this.tasks)
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        console.log("usertasks ", this.tasks)
      }, (errorServicio) => {
        console.log(errorServicio.error.message)
      });
  }


  taskDelete(description, id) {
    this.descriptionDelet = description
    this.idDelet = id
  }

  deleteTask(task_id) {

    this.apiT.deleteTask(task_id)
      .subscribe((data: any) => {
        console.log("eliminado")
        document.getElementById("exampleModal").click();
        this.getUserTask();
      }, (errorServicio) => {
        console.log('HOLITAAAS')
        console.log(errorServicio);
      });
  }

}