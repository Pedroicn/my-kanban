import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';

// Services
import { MessageService } from 'primeng/api';

// Models
import { Board } from '../../models';

// Interface para UI do Board (estendendo o modelo base)
interface BoardUI extends Omit<Board, 'columns'> {
  description?: string;
  color: string;
  tasksCount: number;
  completedTasks: number;
  createdDate: Date;
  lastModified: Date;
}

@Component({
  selector: 'app-boards',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    ToastModule,
    TagModule,
    AvatarModule,
    MenuModule,
    BadgeModule
  ],
  providers: [MessageService],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss'
})
export class BoardsComponent implements OnInit {
  boards: BoardUI[] = [];
  showCreateDialog = false;
  newBoard = { title: '', description: '' };

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadBoards();
  }

  loadBoards() {
    // Mock data - em um projeto real, isso viria de um serviço
    this.boards = [
      {
        id: '1',
        name: 'Projeto Website',
        description: 'Desenvolvimento do novo website da empresa',
        color: '#3B82F6',
        tasksCount: 12,
        completedTasks: 8,
        createdDate: new Date('2024-01-15'),
        lastModified: new Date('2024-01-20'),
        members: ['user1', 'user2', 'user3']
      },
      {
        id: '2',
        name: 'App Mobile',
        description: 'Aplicativo mobile para gestão de tarefas',
        color: '#10B981',
        tasksCount: 8,
        completedTasks: 3,
        createdDate: new Date('2024-01-10'),
        lastModified: new Date('2024-01-18'),
        members: ['user4', 'user5']
      },
      {
        id: '3',
        name: 'Sistema ERP',
        description: 'Implementação do novo sistema ERP',
        color: '#F59E0B',
        tasksCount: 15,
        completedTasks: 12,
        createdDate: new Date('2024-01-05'),
        lastModified: new Date('2024-01-19'),
        members: ['user6', 'user7', 'user8', 'user9']
      }
    ];
  }

  openBoard(boardId: string) {
    this.router.navigate(['/board', boardId]);
  }

  openCreateDialog() {
    this.showCreateDialog = true;
    this.newBoard = { title: '', description: '' };
  }

  closeCreateDialog() {
    this.showCreateDialog = false;
  }

  createBoard() {
    if (this.newBoard.title.trim()) {
      const newBoard: BoardUI = {
        id: (this.boards.length + 1).toString(),
        name: this.newBoard.title,
        description: this.newBoard.description,
        color: this.getRandomColor(),
        tasksCount: 0,
        completedTasks: 0,
        createdDate: new Date(),
        lastModified: new Date(),
        members: []
      };

      this.boards.push(newBoard);
      this.showCreateDialog = false;
      
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Board criado com sucesso!'
      });
    }
  }

  deleteBoard(board: BoardUI, event: Event) {
    event.stopPropagation();
    this.boards = this.boards.filter(b => b.id !== board.id);
    this.messageService.add({
      severity: 'info',
      summary: 'Board Removido',
      detail: `Board "${board.name}" foi removido`
    });
  }

  getRandomColor(): string {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getProgressPercentage(board: BoardUI): number {
    return board.tasksCount > 0 ? Math.round((board.completedTasks / board.tasksCount) * 100) : 0;
  }
}
