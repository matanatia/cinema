import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Movie } from "../interfaces/movie";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  movies: Movie[];
  apiKey: string;
  new_movie_id: number = 0;

  //mock data for testing
  // testing: Movie[] = [
  //   {
  //     Title: "Batman v Superman: Dawn of Justice",
  //     Year: 2016,
  //     Runtime: "151 min",
  //     Genre: "Action, Adventure, Fantasy, Sci-Fi",
  //     Director: "Zack Snyder",
  //     Poster: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  //     imdbID: "tt2975590",
  //     Error: null
  //   },
  //   {
  //     Title: "Star Wars: Episode VIII - The Last Jedi",
  //     Year: 2017,
  //     Runtime: "152 min",
  //     Genre: "Action, Adventure, Fantasy, Sci-Fi",
  //     Director: "Rian Johnson",
  //     Poster: "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg",
  //     imdbID: "tt2527336",
  //     Error: null
  //   },
  //   {
  //     Title: "The Avengers",
  //     Year: 2012,
  //     Runtime: "143 min",
  //     Genre: "Action, Adventure, Fantasy, Sci-Fi",
  //     Director: "Joss Whedon",
  //     Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  //     imdbID: "tt0848228",
  //     Error: null
  //   }
  // ]

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
      "tt3949660", "tt0458241", "tt0076759", "tt0080684", "tt0086190", "tt2488496", "tt0120915",
      "tt0121766", "tt2527336"
    ];

    for (const id of movieIds) {
      this.get_movie(`https://www.omdbapi.com/?apikey=${this.apiKey}&i=${id}`).subscribe(movie => {
        if (!movie.Error) {
          let m:Movie = { imdbID: "", Title: "", Year: null, Runtime: "", Genre: "", Director: "", Poster: "", Error: null};
          for (const key of Object.keys(m)) {
            m[key] = movie[key];
          }
          this.movies.push(m)
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

  delete_movie(id: string): boolean {
    //check if the movie exist
    let deleted_movie = this.movies.filter(movie => movie.imdbID === id)[0];
    if (!deleted_movie) {
      console.error(`Movie id - ${id} wasn't found, deletion operation faild`);
      return false;
    }

    //delete the movie local
    this.movies = this.movies.filter(movie => !movie.imdbID.includes(id));

    //delete the movie at the server - if not succeeded return false 
    //add this functionality in the future

    console.log(`Movie - ${deleted_movie.Title} deleted successfully`);
    return true;
  }

  edit_movie(id: string, editForm: FormGroup): boolean {
    let newDetails = editForm.controls;
    //check if the movie exist
    let edited_movie = this.movies.filter(movie => movie.imdbID.includes(id))[0];
    if (!edited_movie) {
      console.error(`Movie id - ${id} wasn't found, edit operation faild`);
      return false;
    }

    //edit the movie local
    for (const key of Object.keys(newDetails)) {
      edited_movie[key] = newDetails[key].value;
    }

    //edit the movie at the server - if not succeeded return false 
    //add this functionality in the future

    console.log(`Movie - ${edited_movie.Title} edited successfully`);
    return true;
  }


  add_movie(addForm: FormGroup): boolean {

    let new_movie: Movie = {
      imdbID: "id"+this.new_movie_id,
      Title: addForm.controls.Title.value,
      Year: Number(addForm.controls.Year.value),
      Runtime: addForm.controls.Runtime.value,
      Genre: addForm.controls.Genre.value,
      Director: addForm.controls.Director.value,
      Poster: addForm.controls.Poster.value,
      Error: null
    };

    this.new_movie_id++;

    //add the movie local
    this.movies.push(new_movie);

    //add the movie at the server - if not succeeded return false 
    //add this functionality in the future

    console.log(`Movie - ${new_movie.Title} edited successfully`);
    return true;
  }

  check_if_exist(movie_title: string): boolean {
    //check if the movie exist
    // let movie = this.movies.filter(movie => movie.Title.toLocaleLowerCase() === movie_title.toLocaleLowerCase())[0];
    let movie = this.movies.filter(movie => movie.Title.toLocaleLowerCase().split(' ').join('') === movie_title.toLocaleLowerCase().split(' ').join(''))[0];
    if (!movie) {
      console.log(`Movie - '${movie_title}' wasn't found`);
      return false;
    }

    return true;
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
