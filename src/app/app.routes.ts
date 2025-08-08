import { Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardDetailComponent } from './pages/board-detail/board-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/boards', pathMatch: 'full' },
  { path: 'boards', component: BoardsComponent },
  { path: 'board/:id', component: BoardDetailComponent },
  { path: '**', redirectTo: '/boards' }
];
