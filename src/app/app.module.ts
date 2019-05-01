import { NgModule } from '@angular/core';

import { MatButtonModule, MatIconModule, MatMenuModule, MatSelectModule, MatDividerModule, MatGridListModule, MatDialogModule } from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PictureOfTheDayDirective } from './picture-of-the-day/picture-of-the-day.directive';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [AppComponent, CalendarComponent, PictureOfTheDayDirective, AboutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
