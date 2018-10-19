import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WorkoutTypeComponent),
    multi: true
};

@Component({
    selector: 'workout-type',
    providers: [TYPE_CONTROL_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['workout-type.component.scss'],
    templateUrl: 'workout-type.component.html'
})
export class WorkoutTypeComponent implements ControlValueAccessor {
    public selectors: string[] = ['strength', 'endurance'];
    public value: string;

    private onTouch: Function;
    private onModelChange: Function;


    public registerOnTouched(fn: Function) {
        this.onTouch = fn;
    }

    public registerOnChange(fn: Function) {
        this.onModelChange = fn;
    }

    public writeValue(value: string) {
        this.value = value;
    }

    public setSelected(value: string): void {
        this.value = value;
        this.onModelChange(value);
        this.onTouch();
    }

    
}