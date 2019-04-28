import { NgModule } from '@angular/core';

import { MatButtonModule, MatIconModule, MatMenuModule, MatSelectModule } from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PictureOfTheDayDirective } from './picture-of-the-day/picture-of-the-day.directive';

@NgModule({
  declarations: [AppComponent, CalendarComponent, PictureOfTheDayDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
