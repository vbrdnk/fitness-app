import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from 'store';
import { WorkoutsService, Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
    selector: 'workouts',
    styleUrls: ['workouts.component.scss'],
    templateUrl: 'workouts.component.html'
})
export class WorkoutsComponent implements OnInit, OnDestroy {
    public workouts$: Observable<Workout[]>;
    private subscription: Subscription;
    
    constructor(private workoutsService: WorkoutsService, private store: Store) {}

    ngOnInit() {
        this.workouts$ = this.store.select<Workout[]>('workouts');
        this.subscription = this.workoutsService.workouts$.subscribe();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public removeMeal(event: Workout): void {
        this.workoutsService.removeWorkout(event.$key);
    }
}