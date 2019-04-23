import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: 'new-movie-popup',
  templateUrl: './new-movie-popup.component.html',
  styleUrls: ['./new-movie-popup.component.css']
})
export class NewMoviePopupComponent implements OnInit {

  @Output() closeEvent = new EventEmitter();
  @Output() refreshPageEvent = new EventEmitter();
  movieForm: FormGroup;
  current_date = new Date();
  movie_exist = false;

  constructor(private moviesService: MoviesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.movieForm = this.fb.group({
      Title: ['', [Validators.required]],
      Year: ['', [Validators.required, Validators.min(1850),Validators.max(this.current_date.getFullYear())]],
      Runtime: ['', [Validators.required]],
      Genre: ['', [Validators.required]],
      Director: ['', [Validators.required]],
      Poster: ['', [Validators.required, Validators.pattern("(http|https)+.+")]]
    });
  }

  closePopUp() {
    this.closeEvent.emit();
  }

  add_movie(e: Event) {
    e.preventDefault();
    let successe = this.moviesService.add_movie(this.movieForm);
    if (successe) {
      this.refreshPageEvent.emit();
    }

    this.closePopUp();
  }

  check_title() {
    this.movie_exist = this.moviesService.check_if_exist(this.movieForm.controls.Title.value);
  }

}
