import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  // to use services they need to be added as an provider into the constructor
  constructor(private taskService: TaskService) {}

  //call service on ngOnInit for it to render/fire right away
  ngOnInit(): void {
    //subscribe to the observable
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(
      //filters deleted task from ui
      () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
    );
  }

  toggleReminder(task: Task) {
    //set it to the opposite
    //subscribe service to update server
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

   addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
   }
}
