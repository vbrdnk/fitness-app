import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'meal-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['meal-form.component.scss'],
    templateUrl: 'meal-form.component.html'
})
export class MealFormComponent {
    @Output() create: EventEmitter<Meal> = new EventEmitter<Meal>();
    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        ingredients: this.fb.array([''])
    });
    /**
     *
     */
    constructor(private fb: FormBuilder) {
    }

    get requiredError() {
        return (
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        );
    }

    get ingredients(): FormArray {
        return this.form.get('ingredients') as FormArray;
    }

    public addIngredient() {
        this.ingredients.push(new FormControl(''));
    }

    public removeIngredient(index: number) {
        this.ingredients.removeAt(index);
    }

    public createMeal() {
        if (this.form.valid) {
            this.create.emit(this.form.value);
        }
    }
}