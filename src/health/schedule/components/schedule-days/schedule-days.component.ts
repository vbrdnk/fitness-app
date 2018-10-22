import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'schedule-days',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['schedule-days.component.scss'],
    templateUrl: 'schedule-days.component.html'
})
export class ScheduleDaysComponent {
    @Input() selected: number;
    @Output() select: EventEmitter<number> = new EventEmitter<number>();

    public days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    constructor () {}

    public selectDay(index: number): void {
        this.select.emit(index);
    }
}