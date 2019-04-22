import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Movie } from "../../interfaces/movie";

@Component({
  selector: 'edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit {

  @Input() movie:Movie;
  @Output() closeEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closePopUp() {
    this.closeEvent.emit();
  }

}
