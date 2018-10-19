import { Component, OnChanges, SimpleChanges, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
    selector: 'workout-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['workout-form.component.scss'],
    templateUrl: 'workout-form.component.html'
})
export class WorkoutFormComponent implements OnChanges {
    @Input() workout: Workout;
    @Output() create: EventEmitter<Workout> = new EventEmitter<Workout>();
    @Output() update: EventEmitter<Workout> = new EventEmitter<Workout>();
    @Output() remove: EventEmitter<Workout> = new EventEmitter<Workout>();

    public toggled: boolean = false;
    public exists: boolean = false;

    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        type: 'strength'
    });

    constructor(private fb: FormBuilder) {
    }

    ngOnChanges(changes: SimpleChanges) {
        // if (this.meal && this.meal.name) {
        //     // existing
        //     this.exists = true;
        //     this.emptyIngredients();

        //     const value = this.meal;
        //     this.form.patchValue(value);

        //     if (value.ingredients) {
        //         for (const item of value.ingredients) {
        //             this.ingredients.push(new FormControl(item));
        //         }
        //     }
        // }
    }

    get requiredError() {
        return (
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        );
    }

    // get ingredients(): FormArray {
    //     return this.form.get('ingredients') as FormArray;
    // }

    public toggle() {
        this.toggled = !this.toggled;
    }

    // public addIngredient(): void {
    //     this.ingredients.push(new FormControl(''));
    // }

    // public removeIngredient(index: number): void {
    //     this.ingredients.removeAt(index);
    // }

    public createWorkout(): void {
        if (this.form.valid) {
            this.create.emit(this.form.value);
        }
    }

    public updateWorkout(): void {
        if (this.form.valid) {
            this.update.emit(this.form.value);
        }
    }

    public removeWorkout(): void {
        this.remove.emit(this.form.value);
    }

    // private emptyIngredients(): void {
    //     while (this.ingredients.controls.length) {
    //         this.ingredients.removeAt(0);
    //     }
    // }
}