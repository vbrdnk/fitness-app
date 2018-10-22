import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'schedule-controls',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['schedule-controls.component.scss'],
    templateUrl: 'schedule-controls.component.html'
})
export class ScheduleControlsComponent {
    @Input() selected: Date;
    @Output() move: EventEmitter<number> = new EventEmitter<number>();

    public offset = 0;

    constructor () {}

    public moveDate(offset: number): void {
        this.offset = offset;
        this.move.emit(offset);
    }
}