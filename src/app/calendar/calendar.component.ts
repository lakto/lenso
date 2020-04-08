import { Component, OnInit, OnChanges, Input, ViewContainerRef, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

declare var EXIF: any;

export interface MyExif {
    model: string;
    lens: string;
    capture: string;
}

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {

    loading: boolean = false;

    @Input() selectedDate: Date;

    @Input() lastDay: Date;
    @Input() firstDay: Date;

    @ViewChild('photo') photo: TemplateRef<any>;

    days: Date[] = [];

    currentDay: Date;

    // overlay reference
    overlayRef: OverlayRef;

    exif: MyExif = {
        model: '',
        lens: '',
        capture: ''
    }

    isMobile: boolean = false;

    constructor(
        private _breakpointObserver: BreakpointObserver,
        private _viewContainerRef: ViewContainerRef,
        private _overlay: Overlay) {

        this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(
            result => {
                this.isMobile = result.matches;
            }
        );
    }

    ngOnInit() {
        this.days = this.getDaysInMonth(this.selectedDate);
    }

    ngOnChanges() {
        this.days = this.getDaysInMonth(this.selectedDate);
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

    openImage(image: Date, ev: MouseEvent) {
        this.currentDay = image;
        this.openPanelWithBackdrop(ev);
    }

    closeImage() {
        this.currentDay = undefined;
    }

    nextImage() {

    }

    prevImage() {

    }

    openPanelWithBackdrop(ele: any) {
        this.loading = true;
        const positionStrategy = this._overlay.position().global().centerHorizontally().centerVertically();
        const scrollStrategy = this._overlay.scrollStrategies.reposition();
        const config = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-dark-backdrop',
            positionStrategy: positionStrategy,
            scrollStrategy: scrollStrategy
            // positionStrategy: this._overlay.position().global().centerHorizontally()
        });

        this.overlayRef = this._overlay.create(config);
        // overlayRef.attach(this.searchMenu);
        this.overlayRef.attach(new TemplatePortal(this.photo, this._viewContainerRef));
        this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

        // read exif data
        console.log('img source', ele.target.src);
        let allMetaData: any;
        EXIF.getData(ele.target, function () {
            // `this` is provided image, check with `console.log(this)`
            allMetaData = EXIF.getAllTags(ele.target);

        });
        setTimeout(function () {
            const aperture: string = (allMetaData.FNumber.numerator > 0 ? ' @ f' + allMetaData.FNumber.numerator : '');
            this.exif = {
                model: allMetaData.Make + ' ' + allMetaData.Model,
                lens: allMetaData.FocalLength.numerator + 'mm' + aperture,
                capture: allMetaData.ExposureTime.numerator + '/' + allMetaData.ExposureTime.denominator + '" @ ISO ' + allMetaData.ISOSpeedRatings
            };

            console.log('allMetaData', allMetaData);
            console.log('exif', this.exif);


        }, 500);


    };



    /* getOverlayPosition(): PositionStrategy {
        const positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
        ];

        const overlayPosition = this._overlay.position().flexibleConnectedTo(this.searchPanel).withPositions(positions).withLockedPosition(false);
        // .global().centerHorizontally().centerVertically();
        // .flexibleConnectedTo(this.searchPanel.nativeElement.position.withDefaultOffsetX(0));

        return overlayPosition;
    } */

}
