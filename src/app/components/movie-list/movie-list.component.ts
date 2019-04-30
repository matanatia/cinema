import { Component, OnInit, DoCheck } from '@angular/core';

import { MoviesService } from "../../services/movies.service";
import { Movie } from "../../interfaces/movie";

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, DoCheck {

  // movies: Movie[];
  show = false;

  constructor(private moviesService: MoviesService) {
    // this.movies = [];
  }

  ngOnInit() {
    // this.movies = this.moviesService.get_movies();
    this.moviesService.get_movies();
  }

  ngDoCheck() {
  }

  showPopUp() {
    this.show = true;
  }

  closePopUp() {
    this.show = false;
  }

}
