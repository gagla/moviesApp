import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { CommentListComponent } from './comments-list/comment-list.component';
import { CommentDetailComponent } from './comments-list/comment-detail/comment-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent },
  { path: 'comments', component: CommentListComponent },
  { path: 'comments/:id', component: CommentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
