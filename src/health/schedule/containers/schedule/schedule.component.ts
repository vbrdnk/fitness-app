import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'; 

// services
import { ScheduleService, ScheduleItem } from '../../../shared/services/schedule/schedule.service';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';


@Component({
    selector: 'schedule',
    styleUrls: ['schedule.component.scss'],
    templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {
    public open: boolean = false;
    public date$: Observable<Date>;
    public schedule$: Observable<ScheduleItem[]>;
    public selected$: Observable<any>;
    public list$: Observable<Meal[] | Workout[]>;
    private subscriptions: Subscription[] = [];

    constructor(private store: Store, 
                private scheduleService: ScheduleService,
                private mealsService: MealsService,
                private workoutsService: WorkoutsService) {}
    
    ngOnInit() {
        this.date$ = this.store.select('date');
        this.schedule$ = this.store.select('schedule');
        this.selected$ = this.store.select('selected');
        this.list$ = this.store.select('list');

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.selected$.subscribe(),
            this.scheduleService.list$.subscribe(),
            this.mealsService.meals$.subscribe(),
            this.workoutsService.workouts$.subscribe()
        ];
    }

    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public changeDate(date: Date): void {
        this.scheduleService.updateDate(date);
    }

    public changeSection(event: any): void {
        this.open = true;
        this.scheduleService.selectSection(event);
    }
}