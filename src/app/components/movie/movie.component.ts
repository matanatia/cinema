import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Movie } from "../../interfaces/movie";

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie;
  popupType: string = "";

  constructor() {

  }

  ngOnInit() {
  }

  showPopUp(type: string) {
    this.popupType = type;
  }

  closePopUp() {
    this.popupType = "";
  }


}
