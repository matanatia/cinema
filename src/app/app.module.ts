import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { MoviesService } from "./services/movies.service";

import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieComponent } from './components/movie/movie.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { InfoPopupComponent } from './components/info-popup/info-popup.component';
import { EditPopupComponent } from './components/edit-popup/edit-popup.component';
import { NewMoviePopupComponent } from './components/new-movie-popup/new-movie-popup.component';
import { TitlePipe } from './pipes/title.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    HeaderComponent,
    MovieComponent,
    DeletePopupComponent,
    InfoPopupComponent,
    EditPopupComponent,
    NewMoviePopupComponent,
    TitlePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
