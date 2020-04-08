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
  loading: boolean;
  init: boolean;

  firstDay: Date;

  lastDay: Date = new Date();

  imageMeta: ExifMeta;

  days: Date[] = [];

  @ViewChild('image') imageEle: ElementRef;
  @ViewChild('index') indexEle: ElementRef;

  constructor() { }

  ngOnInit(): void {

    this.init = true;


    // go back in time from today
    // TODO: or from end date defined in environment, if no end date is defined, the end date is the current day

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

    this.days = this.getDaysInMonth(this.lastDay);
  }

  getDaysInMonth(date: Date): Date[] {
    this.loading = true;
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
    this.loading = false;
    return days;
  }

  openImage(img: string) {
    this.init = false;
    this.loading = true;
    this.imageEle.nativeElement.style['background-image'] = 'url(' + img + ')';

    exifr.parse(img).then(meta => {
      const shutterSpeed: string = (meta.ExposureTime < 1 ? '1/' + Math.round(1 / meta.ExposureTime) : meta.ExposureTime.toString())
      this.imageMeta = {
        day: meta.DateTimeOriginal,
        camera: meta.Make + ' ' + meta.Model,
        focalLength: meta.FocalLength,
        aperture: meta.FNumber,
        shutterSpeed: shutterSpeed + 's',
        iso: meta.ISO
      }
      this.loading = false;
    });

  }
}
