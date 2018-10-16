import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from 'store';
import { MealsService, Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'meals',
    styleUrls: ['meals.component.scss'],
    templateUrl: 'meals.component.html'
})
export class MealsComponent implements OnInit, OnDestroy {
    public meals$: Observable<Meal[]>;
    private subscription: Subscription;
    /**
     *
     */
    constructor(private mealsService: MealsService, private store: Store) {}

    ngOnInit() {
        this.meals$ = this.store.select<Meal[]>('meals');
        this.subscription = this.mealsService.meals$.subscribe();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public removeMeal(event: Meal): void {
        this.mealsService.removeMeal(event.$key);
    }
}