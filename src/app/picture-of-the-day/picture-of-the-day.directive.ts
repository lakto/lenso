import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { AppConfig } from '../app.config';
import { ImageConfig } from '../img.config';

@Directive({
    selector: '[appPictureOfTheDay]'
})
export class PictureOfTheDayDirective implements OnChanges {

    @Input() source: string;

    // @Input() size?: string = 'small'

    imagePath: string = AppConfig.PATH;

    onError: string = ImageConfig.defaultNotFound;

    constructor(private _renderer: Renderer2,
        private _ele: ElementRef) {
    }

    ngOnChanges() {

        this.source = this.imagePath + this.source + '.jpg';

        this._renderer.setAttribute(this._ele.nativeElement, 'src', this.source);
        this._renderer.setAttribute(this._ele.nativeElement, 'onError', 'this.src=\'' + this.onError + '\'');

    }
}
