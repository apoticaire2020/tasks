
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
    this.getTask();
  }
getTask() {
   this.tasksService.findAll()
   .subscribe(tasks=>this.tasks=tasks);
}
deleteTask(id){
   this.tasksService.delete(id).subscribe(()=>{
    this.tasks=this.tasks.filter(ta => ta.id != id)
   })
}
}
