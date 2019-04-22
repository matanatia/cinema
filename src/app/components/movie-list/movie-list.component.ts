import { Component, OnInit } from '@angular/core';

import { MoviesService } from "../../services/movies.service";
import { Movie } from "../../interfaces/movie";

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];
  
  constructor(private moviesService: MoviesService) {
  }

  ngOnInit() {
    this.movies = this.moviesService.get_movies();
  }

}
