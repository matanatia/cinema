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
  
  constructor() { }

  ngOnInit() {
  }

  closePopUp() {
    this.closeEvent.emit();
  }

}