import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { ScheduleItem } from '../../../shared/services/schedule/schedule.service';
import { ScheduleList } from '../../../shared/services/schedule/schedule.service';

@Component({
    selector: 'schedule-calendar',
    styleUrls: ['schedule-calendar.component.scss'],
    templateUrl: 'schedule-calendar.component.html'
})
export class ScheduleCalendarComponent implements OnChanges {
    @Input() 
    set date(date: Date) {
        this.selectedDay = new Date(date.getTime());
    };

    @Input() items: ScheduleList;
    @Output() change: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    public selectedDayIndex: number;
    public selectedDay: Date;
    public selectedWeek: Date;

    public sections = [
        { key: 'morning', name: 'Morning'},
        { key: 'lunch', name: 'Lunch'},
        { key: 'evening', name: 'Evening'},
        { key: 'snacks', name: 'Snacks and Drinks'}
    ];

    constructor() {}

    ngOnChanges() {
        this.selectedDayIndex = this.getToday(this.selectedDay);
        this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
    }

    public getSection(name: string): ScheduleItem {
        return this.items && this.items[name] || {};
    }

    public onChange(weekOffset: number): void {
        const startOfWeek = this.getStartOfWeek(new Date());
        const startDate = (
            new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
        );
        startDate.setDate(startDate.getDate() + (weekOffset * 7));
        this.change.emit(startDate);
    }

    public selectDay(index: number): void {
        const selectedDay = new Date(this.selectedWeek);

        selectedDay.setDate(selectedDay.getDate() + index);
        this.change.emit(selectedDay);
    }

    public selectSection({ type, assigned, data }: any, section: string): void {
        const day = this.selectedDay;
        this.select.emit({
            type,
            assigned,
            day,
            data
        });
    }

    private getStartOfWeek(date: Date): Date {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    private getToday(date: Date): number {
        let today = date.getDay() - 1;

        if (today < 0) {
            today = 6;
        }

        return today;
    }


}