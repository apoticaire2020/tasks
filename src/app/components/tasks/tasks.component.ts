
import { Component, OnInit } from '@angular/core';
import { TaskService } from './../../services/task.service';
import { Task } from 'src/app/models/task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  editForm = false;
  showForm=false;
  searchText='' ;

  myTask: Task={
    label: '',
    completed: false,
  }
  tasks:Task[] = [];
  resulTask:Task[]=[];

  constructor(private tasksService: TaskService) { }

  ngOnInit(): void {
    this.getTask();
  }
getTask() {
   this.tasksService.findAll()
   .subscribe(tasks=>this.resulTask= this.tasks=tasks);
}
deleteTask(id){
   this.tasksService.delete(id).subscribe(()=>{
    this.tasks=this.tasks.filter(ta => ta.id != id)
   })
}
persistTask(){
  return this.tasksService.persiste(this.myTask).subscribe(
    (task)=>{this.tasks=[task,...this.tasks];
             this.resetTasks();
             this.showForm=false;
    }
  )
}
resetTasks(){
   this.myTask={
    label: '',
    completed: false,
   }
}
toggleCompleted( task){
  this.tasksService.completed(task.id, task.completed).subscribe(
     ()=>{
      task.completed=!task.completed
     }
  )
}
editTask(task){
    this.myTask=task;
    this.editForm=true;
    this.showForm=true;
}
updateTask() {
    this.tasksService.update(this.myTask).subscribe(
      task=>{
        this.resetTasks();
        this.editForm=false;
      }
    )
  }
searchTask(){
   this.resulTask=this.tasks.filter(
    (task)=>task.label.toLowerCase().includes(this.searchText.toLowerCase()))
}
}
