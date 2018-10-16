import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Meal, MealsService } from '../../../shared/services/meals/meals.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'meal',
    styleUrls: ['meal.component.scss'],
    templateUrl: 'meal.component.html'
})
export class MealComponent implements OnInit, OnDestroy {
    public meal$: Observable<Meal>;
    private subscription: Subscription;

    constructor(private mealsService: MealsService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.mealsService.meals$.subscribe();
        this.meal$ = this.route.params
            .switchMap((param) => this.mealsService.getMeal(param.id));
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public async addMeal(event: Meal) {
        await this.mealsService.addMeal(event);
        this.backToMeals();
    }

    public async updateMeal(event: Meal) {
        const key = this.route.snapshot.params.id;
        await this.mealsService.updateMeal(key, event);
        this.backToMeals();
    }

    public async removeMeal(event: Meal) {
        const key = this.route.snapshot.params.id;
        await this.mealsService.removeMeal(key);
        this.backToMeals();
    }

    private backToMeals(): void {
        this.router.navigate(['meals']);
    }
}