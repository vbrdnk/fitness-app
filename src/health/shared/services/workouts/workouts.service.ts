import { Injectable } from '@angular/core';

// third-party
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

// services
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Workout {
    name: string,
    type: string,
    strength: any,
    edurance: any,
    timestamp: number,
    $key: string,
    $exists: () => boolean;
}


@Injectable()
export class WorkoutsService {

    public workouts$: Observable<Workout[]> = this.db.list(`workouts/${this.uid}`)
        .do(next => this.store.set('workouts', next));
    
    constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) {
    }

    get uid() {
        return this.authService.user.uid;
    }

    public getWorkout(key: string): Observable<any> {
        if (!key) {
            return Observable.of({});
        }

        return this.store.select<Workout[]>('workouts')
            .filter(Boolean)
            .map((workouts) => workouts.find((workout: Workout) => workout.$key === key));
    }

    public addWorkout(workout: Workout) {
        return this.db.list(`workouts/${this.uid}`).push(workout);
    }

    public updateWorkout(key: string, workout: Workout) {
        return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
    }

    public removeWorkout(key: string) {
        return this.db.list(`workouts/${this.uid}`).remove(key);
    }
}