import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';

// Services
import { MessageService } from 'primeng/api';

interface Task {
  id?: number;
  title: string;
  description: string;
  assignee: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  progress: number;
  dueDate?: Date;
}

@Component({
  selector: 'app-task-dialog',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    InputNumberModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  @Input() visible = false;
  @Input() task: Task = this.getEmptyTask();
  @Input() isEdit = false;
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() taskSaved = new EventEmitter<Task>();
  @Output() taskCanceled = new EventEmitter<void>();

  priorityOptions = [
    { label: 'Baixa', value: 'low' },
    { label: 'Média', value: 'medium' },
    { label: 'Alta', value: 'high' }
  ];

  assigneeOptions = [
    { label: 'João Silva', value: 'João Silva' },
    { label: 'Maria Santos', value: 'Maria Santos' },
    { label: 'Pedro Costa', value: 'Pedro Costa' },
    { label: 'Ana Lima', value: 'Ana Lima' },
    { label: 'Carlos Oliveira', value: 'Carlos Oliveira' }
  ];

  constructor(private messageService: MessageService) {}

  get dialogTitle(): string {
    return this.isEdit ? 'Editar Tarefa' : 'Nova Tarefa';
  }

  get submitButtonLabel(): string {
    return this.isEdit ? 'Salvar' : 'Criar';
  }

  getEmptyTask(): Task {
    return {
      title: '',
      description: '',
      assignee: '',
      tags: [],
      priority: 'medium',
      progress: 0,
      dueDate: undefined
    };
  }

  onSave() {
    if (!this.isValidTask()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Por favor, preencha todos os campos obrigatórios.'
      });
      return;
    }

    const taskToSave: Task = {
      ...this.task,
      id: this.isEdit ? this.task.id : Date.now()
    };

    this.taskSaved.emit(taskToSave);
    this.closeDialog();

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: this.isEdit ? 'Tarefa atualizada com sucesso!' : 'Tarefa criada com sucesso!'
    });
  }

  onCancel() {
    this.taskCanceled.emit();
    this.closeDialog();
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetTask();
  }

  resetTask() {
    if (!this.isEdit) {
      this.task = this.getEmptyTask();
    }
  }

  isValidTask(): boolean {
    return !!(
      this.task.title.trim() &&
      this.task.description.trim() &&
      this.task.assignee
    );
  }

  onProgressChange(value: number) {
    this.task.progress = Math.max(0, Math.min(100, value));
  }

  addTag(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    
    if (value && !this.task.tags.includes(value)) {
      this.task.tags.push(value);
      input.value = '';
    }
  }

  removeTag(index: number) {
    this.task.tags.splice(index, 1);
  }
}
