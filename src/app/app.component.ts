import { Component, OnInit } from '@angular/core';
import { AppConfig } from './app.config';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading: boolean = true;

  selectedDate: Date;

  months: Date[] = [];

  lastDay: Date = new Date();
  firstDay: Date;

  currentYear: number = new Date().getFullYear();

  constructor (public dialog: MatDialog) {

  }


  ngOnInit() {
    this.loading = true;
    this.lastDay.setDate(new Date().getDate() - 1);

    // first day to display: get first day of project from app config
    this.firstDay = new Date(
      AppConfig.YEAR,
      AppConfig.MONTH - 1,
      AppConfig.DAY
    );

    this.setCalendar(this.lastDay);

    // calculate period
    this.months = this.getMonthsOfProject(this.firstDay);

    this.loading = false;

  }

  getMonthsOfProject(begin: Date): Date[] {

    const date: Date = new Date();
    date.setDate(new Date().getDate() - 1);

    const months: Date[] = [];

    while (date > begin) {
      months.push(new Date(date));
      date.setMonth(date.getMonth() - 1);
    }

    return months;

  }

  setCalendar(month: Date) {
    this.selectedDate = month;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AboutComponent, {
      width: '480px'
    });
  }


}
