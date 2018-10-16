import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Meal, MealsService } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'meal',
    styleUrls: ['meal.component.scss'],
    templateUrl: 'meal.component.html'
})
export class MealComponent {
    /**
     *
     */
    constructor(private mealsService: MealsService, private router: Router) {}

    public async addMeal(event: Meal) {
        await this.mealsService.addMeal(event);
        this.backToMeals();
    }

    private backToMeals(): void {
        this.router.navigate(['meals']);
    }
}