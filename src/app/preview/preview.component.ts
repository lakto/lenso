import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DefaultImage } from '../../assets/images/default.image';

@Component({
  selector: 'app-preview',
  template: `<img [src]="image" [alt]="alt" (load)="loadPreview($event)" (error)="errorPreview($event)" [class.full]="full" [class.zoom]="zoom" />`,
  styleUrls: ['./preview.component.scss'],
  host: {
    '(click)': 'openImage()'
  }
})
export class PreviewComponent implements OnInit {

  @Input() day: string;
  @Input() alt?: string;
  @Input() full?: boolean;
  @Input() zoom?: boolean;

  @Output() file: EventEmitter<string> = new EventEmitter();

  error: boolean = false;

  image: string;

  constructor(private _host: ElementRef) { }

  ngOnInit(): void {
    this.image = environment.imagePath + this.day + '.jpg';
  }

  loadPreview(ev: Event) {

  }

  errorPreview(ev: Event) {
    this.image = DefaultImage.notFound;
    this._host.nativeElement.classList.add('error');
    this.error = true;
  }

  openImage() {
    if (!this.error) {
      this.file.emit(this.image);
    }
  }

}
