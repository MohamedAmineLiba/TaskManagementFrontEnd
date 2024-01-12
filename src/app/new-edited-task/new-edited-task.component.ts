import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../type/Task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-edited-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './new-edited-task.component.html',
  styleUrl: './new-edited-task.component.css'
})
export class NewEditedTaskComponent {
  @Input() tache !: Task;
  @Output() saveClicked = new EventEmitter<Task>();
  @Output() cancelClicked = new EventEmitter<void>();

  onSave() {
    this.saveClicked.emit(this.tache);
  }

  onCancel() {
    this.cancelClicked.emit();
  }
}
