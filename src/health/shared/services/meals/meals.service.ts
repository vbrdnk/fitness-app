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

export interface Meal {
    name: string,
    ingredients: string[],
    timestamp: number,
    $key: string,
    $exists: () => boolean;
}


@Injectable()
export class MealsService {

    public meals$: Observable<any> = this.db.list(`meals/${this.uid}`)
        .do(next => this.store.set('meals', next));
    
    constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) {
    }

    get uid() {
        return this.authService.user.uid;
    }

    public getMeal(key: string): Observable<any> {
        if (!key) {
            return Observable.of({});
        }

        return this.store.select<Meal[]>('meals')
            .filter(Boolean)
            .map((meals) => meals.find((meal: Meal) => meal.$key === key));
    }

    public addMeal(meal: Meal) {
        return this.db.list(`meals/${this.uid}`).push(meal);
    }

    public updateMeal(key: string, meal: Meal) {
        return this.db.object(`meals/${this.uid}/${key}`).update(meal);
    }

    public removeMeal(key: string) {
        return this.db.list(`meals/${this.uid}`).remove(key);
    }
}