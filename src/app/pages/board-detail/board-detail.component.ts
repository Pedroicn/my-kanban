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

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  progress: number;
  createdDate: Date;
  dueDate?: Date;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
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
  columns: Column[] = [];

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
        title: 'A Fazer',
        color: '#6366F1',
        tasks: [
          {
            id: 1,
            title: 'Criar wireframes',
            description: 'Desenvolver wireframes para as principais telas',
            assignee: 'João Silva',
            tags: ['Design', 'UX'],
            priority: 'high',
            progress: 0,
            createdDate: new Date('2024-01-15'),
            dueDate: new Date('2024-01-25')
          },
          {
            id: 2,
            title: 'Configurar ambiente',
            description: 'Configurar ambiente de desenvolvimento',
            assignee: 'Maria Santos',
            tags: ['DevOps'],
            priority: 'medium',
            progress: 0,
            createdDate: new Date('2024-01-16')
          }
        ]
      },
      {
        id: 'inprogress',
        title: 'Em Progresso',
        color: '#F59E0B',
        tasks: [
          {
            id: 3,
            title: 'Implementar autenticação',
            description: 'Desenvolver sistema de login e registro',
            assignee: 'Pedro Costa',
            tags: ['Backend', 'Security'],
            priority: 'high',
            progress: 65,
            createdDate: new Date('2024-01-10'),
            dueDate: new Date('2024-01-20')
          }
        ]
      },
      {
        id: 'review',
        title: 'Em Revisão',
        color: '#8B5CF6',
        tasks: [
          {
            id: 4,
            title: 'Testes unitários',
            description: 'Escrever testes para componentes principais',
            assignee: 'Ana Lima',
            tags: ['Testing'],
            priority: 'medium',
            progress: 90,
            createdDate: new Date('2024-01-08')
          }
        ]
      },
      {
        id: 'done',
        title: 'Concluído',
        color: '#10B981',
        tasks: [
          {
            id: 5,
            title: 'Setup do projeto',
            description: 'Configuração inicial do projeto Angular',
            assignee: 'Carlos Oliveira',
            tags: ['Setup'],
            priority: 'low',
            progress: 100,
            createdDate: new Date('2024-01-05')
          }
        ]
      }
    ];
  }

  goBack() {
    this.router.navigate(['/boards']);
  }

  // Método simplificado sem drag and drop (será implementado depois)
  moveTask(taskId: number, fromColumn: string, toColumn: string) {
    // Lógica para mover tarefa entre colunas
    this.messageService.add({
      severity: 'success',
      summary: 'Tarefa Movida',
      detail: 'Tarefa movida com sucesso!'
    });
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'info';
    }
  }

  getPriorityLabel(priority: string): string {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Normal';
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
