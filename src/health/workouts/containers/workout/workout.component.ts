import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'workout',
    styleUrls: ['workout.component.scss'],
    templateUrl: 'workout.component.html'
})
export class WorkoutComponent implements OnInit, OnDestroy {
    public workout$: Observable<Workout>;
    private subscription: Subscription;

    constructor(private workoutsService: WorkoutsService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.workoutsService.workouts$.subscribe();
        this.workout$ = this.route.params
            .switchMap((param) => this.workoutsService.getWorkout(param.id));
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public async addWorkout(event: Workout) {
        await this.workoutsService.addWorkout(event);
        this.backToWorkouts();
    }

    public async updateWorkout(event: Workout) {
        const key = this.route.snapshot.params.id;
        await this.workoutsService.updateWorkout(key, event);
        this.backToWorkouts();
    }

    public async removeWorkout(event: Workout) {
        const key = this.route.snapshot.params.id;
        await this.workoutsService.removeWorkout(key);
        this.backToWorkouts();
    }

    private backToWorkouts(): void {
        this.router.navigate(['workouts']);
    }
}