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

  constructor(private http: HttpClient) {
    this.apiKey = '74fed2a7';
    this.movies = [];
  }

  get_movies(): Movie[] {
    //check if the movies already in this.movies 
    if (this.movies.length > 0) {
      return this.movies;
    }

    const movieIds: string[] = ["tt2975590", "tt0348150", "tt0081573", "tt0086393",
      "tt0094074", "tt1673430", "tt1398941", "tt0934706", "tt0839995", "tt2084949", "tt0848228",
      "tt2395427", "tt4154756", "tt0491703", "tt1259998", "tt3482378", "tt4296026", "tt1291150",
      "tt3949660", "tt0458241","tt0076759","tt0080684","tt0086190","tt2488496","tt0120915",
      "tt0121766","tt2527336"
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
