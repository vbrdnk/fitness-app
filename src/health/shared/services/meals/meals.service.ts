import { Injectable } from '@angular/core';

// third-party
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

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
    /**
     *
     */
    constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) {
    }

    get uid() {
        return this.authService.user.uid;
    }
}