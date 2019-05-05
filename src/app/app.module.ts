import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatGridListModule, MatIconModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PictureOfTheDayDirective } from './picture-of-the-day/picture-of-the-day.directive';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    PictureOfTheDayDirective,
    AboutComponent
  ],
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
    OverlayModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
