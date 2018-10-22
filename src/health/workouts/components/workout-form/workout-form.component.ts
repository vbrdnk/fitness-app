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
        type: 'strength',
        strength: this.fb.group({
            reps: 0,
            sets: 0,
            weight: 0
        }),
        endurance: this.fb.group({
            distance: 0,
            duration: 0
        })
    });

    constructor(private fb: FormBuilder) {
    }

    get placeholder(): string {
        return `e.g. ${this.form.get('type').value === 'strength' ? 'Benchpress' : 'Treadmill' }`;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.workout && this.workout.name) {
            // existing
            this.exists = true;

            const value = this.workout;
            this.form.patchValue(value);
        }
    }

    get requiredError() {
        return (
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        );
    }

    public toggle() {
        this.toggled = !this.toggled;
    }

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
}