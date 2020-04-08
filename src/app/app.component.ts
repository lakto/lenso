import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import exifr from 'exifr';
import { environment } from 'src/environments/environment';

export interface ExifMeta {
  day: Date;
  camera: string;
  focalLength: number;
  aperture: number;
  shutterSpeed: string;
  iso: number

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean = true;
  init: boolean;
  zoomIn: boolean = true;

  firstDay: Date;

  lastDay: Date = new Date();

  imageMeta: ExifMeta;

  days: Date[] = [];
  allDays: number;
  currentIndex: number = 0;

  error: boolean;

  @ViewChild('image') imageEle: ElementRef;
  @ViewChild('index') indexEle: ElementRef;

  constructor() { }

  ngOnInit(): void {

    this.init = true;
    this.loading = true

    // go back in time from today

    this.firstDay = new Date(
      environment.start.year,
      environment.start.month - 1,
      environment.start.day
    );

    if (environment.end) {
      this.lastDay = new Date(
        environment.end.year,
        environment.end.month - 1,
        environment.end.day
      );
    }

    this.allDays = this.daysBetween(this.firstDay, this.lastDay);

    if (this.allDays < 0) {
      // start date is in the future or not correct
      this.init = false;

      this.error = true;

    } else {
      this.loadPreviews();
      this.loading = false;
    }

  }

  daysBetween(first: Date, second: Date) {

    // Copy date parts of the timestamps, discarding the time parts.
    let one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    let two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

    // Do the math.
    let millisecondsPerDay = 1000 * 60 * 60 * 24;
    let millisBetween = two.getTime() - one.getTime();
    let days = millisBetween / millisecondsPerDay;

    // Round down.
    return days;
  }

  loadPreviews() {
    let counter = 10;
    let i: number = 0;
    while (i < counter && this.currentIndex <= this.allDays) {
      // add last day to days array
      this.days[this.currentIndex] = new Date(this.lastDay);

      // set previous day as last day
      this.lastDay.setDate(this.lastDay.getDate() - 1);
      // this.lastDay = current;
      this.currentIndex++;
      i++;
    }
  }


  // calendar method: show days from current month
  getDaysInMonth(date: Date): Date[] {

    const month: Date = new Date(date);

    // last day of month
    let lastDayofMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    if (lastDayofMonth > this.lastDay) {
      lastDayofMonth = new Date(this.lastDay);
    }

    const days = [];
    while (lastDayofMonth.getMonth() === month.getMonth()) {
      days.push(new Date(lastDayofMonth));
      lastDayofMonth.setDate(lastDayofMonth.getDate() - 1);
    }

    if (days.length < 16) {
      // load next month already
    }

    return days;
  }

  openImage(img: string) {
    this.init = false;
    this.loading = true;
    this.zoomIn = true;

    exifr.parse(img).then(meta => {
      const shutterSpeed: string = (meta.ExposureTime < 1 ? '1/' + Math.round(1 / meta.ExposureTime) : meta.ExposureTime.toString())
      const camera: string = (meta.Make && meta.Model ? meta.Make + ' ' + meta.Model : meta['271'] + ' ' + meta['272'])
      this.imageMeta = {
        day: meta.DateTimeOriginal,
        camera: camera,
        focalLength: meta.FocalLength,
        aperture: Math.round(meta.FNumber * 100) / 100,
        shutterSpeed: shutterSpeed + 's',
        iso: meta.ISO
      }
      this.imageEle.nativeElement.style['background-image'] = 'url(' + img + ')';
      this.loading = false;
    });

  }
}
