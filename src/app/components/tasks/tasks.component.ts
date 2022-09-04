
import { Component, OnInit } from '@angular/core';
import { TaskService } from './../../services/task.service';
import { Task } from 'src/app/models/task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:Task[] = [];
  constructor(private tasksService: TaskService) { }

  ngOnInit(): void {
  }
getTask() {
   this.tasksService.findAll()
   .subscribe(data=>this.tasks=data);
}
}
