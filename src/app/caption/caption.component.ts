import { Component, OnInit, Input } from '@angular/core';
import { Exif } from '../picture/picture.component';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss']
})
export class CaptionComponent implements OnInit {

  @Input() exif: Exif;

  constructor() { }

  ngOnInit(): void {
  }

}
