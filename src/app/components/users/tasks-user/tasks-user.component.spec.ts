import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksUserComponent } from './tasks-user.component';

describe('TasksUserComponent', () => {
  let component: TasksUserComponent;
  let fixture: ComponentFixture<TasksUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
