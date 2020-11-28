import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApiTaskService } from '../../../services/Task/api-task.service'

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class ListTaskComponent implements OnInit {
  displayedColumns: string[] = ['id','description', 'user_name', 'state', 'options'];
  dataSource: any;
  expandedElement = false;
  tasks: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiT: ApiTaskService) {
    console.log('Hola ocnstructor')
    this.getTasks();
  }
  ngOnInit() {
  }

  getTasks(){
    console.log('get tasks')
    this.apiT.getTasks()
      .subscribe((data: any) => {
        console.log(data)
        this.tasks = data.data.info;
        console.log(this.tasks)
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }, (errorServicio) => {
        console.log('HOLITAAAS')
        console.log(errorServicio);
      });
  }

}
