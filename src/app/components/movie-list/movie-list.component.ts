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
    //this.movies = this.moviesService.get_movies();
    this.movies.push({
      Title: "Batman v Superman: Dawn of Justice",
      Year: 2016,
      Runtime: "151 min",
      Genre: "Action, Adventure, Fantasy, Sci-Fi",
      Director: "Zack Snyder",
      Poster: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      imdbID: "tt2975590",
      Error: null
    });

    this.movies.push({
      Title: "Star Wars: Episode VIII - The Last Jedi",
      Year: 2017,
      Runtime: "152 min",
      Genre: "Action, Adventure, Fantasy, Sci-Fi",
      Director: "Rian Johnson",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg",
      imdbID: "tt2527336",
      Error: null
    });

    this.movies.push({
      Title: "The Avengers",
      Year: 2012,
      Runtime: "143 min",
      Genre: "Action, Adventure, Fantasy, Sci-Fi",
      Director: "Joss Whedon",
      Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      imdbID: "tt0848228",
      Error: null
    });

  }

}
