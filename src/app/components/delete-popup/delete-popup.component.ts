import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoviesService } from "../../services/movies.service";

import { Movie } from "../../interfaces/movie";

@Component({
  selector: 'delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit {

  @Input() movie: Movie;
  @Output() closeEvent = new EventEmitter();

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
  }

  closePopUp() {
    this.closeEvent.emit();
  }

  delete_movie() {
    this.moviesService.delete_movie(this.movie.imdbID);
    this.closePopUp();
  }

}
