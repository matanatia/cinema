import { Component, OnInit, Input } from '@angular/core';

import { Movie } from "../../interfaces/movie";

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie;

  constructor() { }

  ngOnInit() {
  }

  iClick(action: string) {
    console.log(action);
  }


}
