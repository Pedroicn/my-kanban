import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';

// Services
import { MessageService } from 'primeng/api';

// Models
import { Task, Column, Board } from '../../models';

// Interface para UI da Task (estendendo o modelo base)
interface TaskUI extends Task {
  tags?: string[];
}

@Component({
  selector: 'app-board-detail',
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ToolbarModule,
    ToastModule,
    TagModule,
    AvatarModule,
    BadgeModule,
    ProgressBarModule,
    MenuModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './board-detail.component.html',
  styleUrl: './board-detail.component.scss'
})
export class BoardDetailComponent implements OnInit {
  boardId: string | null = null;
  boardTitle = 'Board Kanban';
  columns: { id: string; name: string; tasks: TaskUI[] }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.boardId = this.route.snapshot.paramMap.get('id');
    this.loadBoard();
  }

  loadBoard() {
    // Mock data - em um projeto real, isso viria de um serviço
    this.boardTitle = `Board ${this.boardId}`;
    
    this.columns = [
      {
        id: 'todo',
        name: 'A Fazer',
        tasks: [
          {
            id: '1',
            title: 'Criar wireframes',
            description: 'Desenvolver wireframes para as principais telas',
            priority: 'high',
            assignedTo: ['user1'],
            completed: false,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15'),
            dueDate: new Date('2024-01-25'),
            checklist: [
              { label: 'Definir layout principal', checked: true },
              { label: 'Criar telas de login', checked: false }
            ]
          } as TaskUI,
          {
            id: '2',
            title: 'Configurar ambiente',
            description: 'Configurar ambiente de desenvolvimento',
            priority: 'medium',
            assignedTo: ['user2'],
            completed: false,
            createdAt: new Date('2024-01-16'),
            updatedAt: new Date('2024-01-16'),
            tags: ['DevOps']
          } as TaskUI
        ]
      },
      {
        id: 'inprogress',
        name: 'Em Progresso',
        tasks: [
          {
            id: '3',
            title: 'Implementar autenticação',
            description: 'Desenvolver sistema de login e registro',
            priority: 'high',
            assignedTo: ['user3'],
            completed: false,
            createdAt: new Date('2024-01-10'),
            updatedAt: new Date('2024-01-20'),
            dueDate: new Date('2024-01-20'),
            tags: ['Backend', 'Security']
          } as TaskUI
        ]
      },
      {
        id: 'review',
        name: 'Em Revisão',
        tasks: [
          {
            id: '4',
            title: 'Testes unitários',
            description: 'Escrever testes para componentes principais',
            priority: 'medium',
            assignedTo: ['user4'],
            completed: false,
            createdAt: new Date('2024-01-08'),
            updatedAt: new Date('2024-01-18'),
            tags: ['Testing']
          } as TaskUI
        ]
      },
      {
        id: 'done',
        name: 'Concluído',
        tasks: [
          {
            id: '5',
            title: 'Setup do projeto',
            description: 'Configuração inicial do projeto Angular',
            priority: 'low',
            assignedTo: ['user5'],
            completed: true,
            createdAt: new Date('2024-01-05'),
            updatedAt: new Date('2024-01-05'),
            tags: ['Setup']
          } as TaskUI
        ]
      }
    ];
  }

  goBack() {
    this.router.navigate(['/boards']);
  }

  // Método simplificado sem drag and drop (será implementado depois)
  moveTask(taskId: string, fromColumn: string, toColumn: string) {
    // Lógica para mover tarefa entre colunas
    this.messageService.add({
      severity: 'success',
      summary: 'Tarefa Movida',
      detail: 'Tarefa movida com sucesso!'
    });
  }

  getPriorityColor(priority?: string): string {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'info';
    }
  }

  getPriorityLabel(priority?: string): string {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Normal';
    }
  }

  getInitials(userIds: string[] | undefined): string {
    // Por enquanto, retorna as iniciais do primeiro usuário
    // Em um projeto real, isso seria resolvido com um serviço de usuários
    if (userIds && userIds.length > 0) {
      return userIds[0].substring(0, 2).toUpperCase();
    }
    return 'NA';
  }

  getAssigneeName(userIds: string[] | undefined): string {
    // Por enquanto, retorna o ID do primeiro usuário
    // Em um projeto real, isso seria resolvido com um serviço de usuários
    if (userIds && userIds.length > 0) {
      return `Usuário ${userIds[0]}`;
    }
    return 'Não atribuído';
  }

  getProgress(task: TaskUI): number {
    if (!task.checklist || task.checklist.length === 0) {
      return task.completed ? 100 : 0;
    }
    
    const completedItems = task.checklist.filter(item => item.checked).length;
    return Math.round((completedItems / task.checklist.length) * 100);
  }
}
