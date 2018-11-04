import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any;
  newMovie: String;

  constructor(public movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }
  getMovies() {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    }
    )
  }
  addMovie(movie) {
    this.movieService.postMovies(movie).subscribe(
      movie => {
        this.getMovies();
        return true
      }
    )
  }
}
