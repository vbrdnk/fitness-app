import { Component, OnChanges, SimpleChanges, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'meal-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['meal-form.component.scss'],
    templateUrl: 'meal-form.component.html'
})
export class MealFormComponent implements OnChanges {
    @Input() meal: Meal;
    @Output() create: EventEmitter<Meal> = new EventEmitter<Meal>();
    @Output() update: EventEmitter<Meal> = new EventEmitter<Meal>();
    @Output() remove: EventEmitter<Meal> = new EventEmitter<Meal>();

    public toggled: boolean = false;
    public exists: boolean = false;

    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        ingredients: this.fb.array([''])
    });

    constructor(private fb: FormBuilder) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.meal && this.meal.name) {
            // existing
            this.exists = true;
            this.emptyIngredients();

            const value = this.meal;
            this.form.patchValue(value);

            if (value.ingredients) {
                for (const item of value.ingredients) {
                    this.ingredients.push(new FormControl(item));
                }
            }
        }
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

    public toggle() {
        this.toggled = !this.toggled;
    }

    public addIngredient(): void {
        this.ingredients.push(new FormControl(''));
    }

    public removeIngredient(index: number): void {
        this.ingredients.removeAt(index);
    }

    public createMeal(): void {
        if (this.form.valid) {
            this.create.emit(this.form.value);
        }
    }

    public updateMeal(): void {
        if (this.form.valid) {
            this.update.emit(this.form.value);
        }
    }

    public removeMeal(): void {
        this.remove.emit(this.form.value);
    }

    private emptyIngredients(): void {
        while (this.ingredients.controls.length) {
            this.ingredients.removeAt(0);
        }
    }
}