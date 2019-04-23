import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMoviePopupComponent } from './new-movie-popup.component';

describe('NewMoviePopupComponent', () => {
  let component: NewMoviePopupComponent;
  let fixture: ComponentFixture<NewMoviePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMoviePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMoviePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
