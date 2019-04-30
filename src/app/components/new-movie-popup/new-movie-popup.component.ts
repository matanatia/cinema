import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: 'new-movie-popup',
  templateUrl: './new-movie-popup.component.html',
  styleUrls: ['./new-movie-popup.component.css']
})
export class NewMoviePopupComponent implements OnInit {

  @Output() closeEvent = new EventEmitter();
  movieForm: FormGroup;
  current_date = new Date();

  constructor(private moviesService: MoviesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.movieForm = this.fb.group({
      Title: ['', [Validators.required, this.forbiddenNameValidator()]],
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

  add_movie() {
    let successe = this.moviesService.add_movie(this.movieForm);
    if (successe) {
      console.log(`movie ${this.movieForm.controls.Title.value} was add successfully`);
    }

    this.closePopUp();
  }

  //costume validetor
  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = this.moviesService.check_if_exist(control.value);
      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
  }

}
