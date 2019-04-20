import { Injectable } from '@angular/core';

import { Movie } from "../interfaces/movie";
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  movies: Movie[];
  apiKey: string;

  constructor() {
    this.apiKey = '74fed2a7';
    this.movies = [];
  }

  get_movies(): Movie[] {
    //check if the movies allready in this.movies 
    if (this.movies.length > 0) {
      console.log("This is the Saved movies");
      return this.movies;
    }

    //if not - fetch the movies from the server 
    const urls: string[] = [
      `http://www.omdbapi.com/?apikey=${this.apiKey}&s=superman&type=movie`,
      `http://www.omdbapi.com/?apikey=${this.apiKey}&s=spiderman&type=movie`,
      `http://www.omdbapi.com/?apikey=${this.apiKey}&s=avengers&type=movie`
    ];

    let test:Movie[];

    fetch(urls[0])
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        //save the data from the server in this.movies
        // this.movies = json.Search

        console.log(json.Search)
        test = json.Search;
        return json.Search;
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log("Fetched that shiiitttt");
    // return [];
  }
}
