import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'; 

// services
import { ScheduleService, ScheduleItem } from '../../../shared/services/schedule/schedule.service';


@Component({
    selector: 'schedule',
    styleUrls: ['schedule.component.scss'],
    templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {
    public date$: Observable<Date>;
    public schedule$: Observable<ScheduleItem[]>;
    private subscriptions: Subscription[] = [];

    constructor(private store: Store, private scheduleService: ScheduleService) {}
    
    ngOnInit() {
        this.date$ = this.store.select('date');
        this.schedule$ = this.store.select('schedule');

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.selected$.subscribe(),
        ];
    }

    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public changeDate(date: Date): void {
        this.scheduleService.updateDate(date);
    }

    public changeSection(event: any): void {
        this.scheduleService.selectSection(event);
    }
}