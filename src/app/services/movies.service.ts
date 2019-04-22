import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Movie } from "../interfaces/movie";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  movies: Movie[];
  apiKey: string;

  testing: Movie[] = [
    {
      Title: "Batman v Superman: Dawn of Justice",
      Year: 2016,
      Runtime: "151 min",
      Genre: "Action, Adventure, Fantasy, Sci-Fi",
      Director: "Zack Snyder",
      Poster: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      imdbID: "tt2975590",
      Error: null
    },
    {
      Title: "Star Wars: Episode VIII - The Last Jedi",
      Year: 2017,
      Runtime: "152 min",
      Genre: "Action, Adventure, Fantasy, Sci-Fi",
      Director: "Rian Johnson",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg",
      imdbID: "tt2527336",
      Error: null
    },
    {
      Title: "The Avengers",
      Year: 2012,
      Runtime: "143 min",
      Genre: "Action, Adventure, Fantasy, Sci-Fi",
      Director: "Joss Whedon",
      Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      imdbID: "tt0848228",
      Error: null
    }
  ]

  constructor(private http: HttpClient) {
    this.apiKey = '74fed2a7';
    this.movies = [];
  }

  get_movies(): Movie[] {
    //for test
    return this.testing;
    //check if the movies already in this.movies 
    if (this.movies.length > 0) {
      return this.movies;
    }

    const movieIds: string[] = ["tt2975590", "tt0348150", "tt0081573", "tt0086393",
      "tt0094074", "tt1673430", "tt1398941", "tt0934706", "tt0839995", "tt2084949", "tt0848228",
      "tt2395427", "tt4154756", "tt0491703", "tt1259998", "tt3482378", "tt4296026", "tt1291150",
      "tt3949660", "tt0458241", "tt0076759", "tt0080684", "tt0086190", "tt2488496", "tt0120915",
      "tt0121766", "tt2527336"
    ];

    for (const id of movieIds) {
      this.get_movie(`http://www.omdbapi.com/?apikey=${this.apiKey}&i=${id}`).subscribe(movie => {
        if (!movie.Error) {
          this.movies.push(movie)
        }
        else {
          console.error(`get_movie for movie Id '${id}' failed: ${movie.Error}`);
        }
      });
    }

    return this.movies;
  }

  get_movie(url): Observable<Movie> {
    return this.http.get<Movie>(url)
      .pipe(
        catchError(this.handleError<Movie>('get_movie', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
