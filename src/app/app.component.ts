import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import exifr from 'exifr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  file: string;

  lastDay: Date;

  constructor() { }

  ngOnInit(): void {

  }
}
