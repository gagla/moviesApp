import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MovieService } from './movie.service';
import { MovieListComponent } from './movie-list/movie-list.component';
import { CommentListComponent } from './comments-list/comment-list.component';
import { CommentService } from './comment.service';
import { CommentDetailComponent } from './comments-list/comment-detail/comment-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    CommentListComponent,
    CommentDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MovieService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
