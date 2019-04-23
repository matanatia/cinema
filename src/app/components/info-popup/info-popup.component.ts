import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Movie } from "../../interfaces/movie";

@Component({
  selector: 'info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.css']
})
export class InfoPopupComponent implements OnInit {

  @Input() movie: Movie;
  @Output() closeEvent = new EventEmitter();
  movie_detailes: string[];

  constructor() { }

  ngOnInit() {
    this.movie_detailes = Object.keys(this.movie);
    this.movie_detailes = this.movie_detailes.filter(key=>!key.includes("imdbID")&&!key.includes("Error")&&!key.includes("Poster"));
  }

  closePopUp() {
    this.closeEvent.emit();
  }

}