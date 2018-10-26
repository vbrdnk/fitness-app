import { Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Meal } from '../../../shared/services/meals/meals.service';
import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
    selector: 'schedule-assign',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['schedule-assign.component.scss'],
    templateUrl: 'schedule-assign.component.html'
})
export class ScheduleAssignComponent implements OnInit{
    @Input() section: any;
    @Input() list: Meal[] | Workout[];
    @Output() update: EventEmitter<any> = new EventEmitter<any>();
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

    private selected: string[] = [];

    ngOnInit() {
        this.selected = [...this.section.assigned];
    }

    public toggleItem(name: string) {
        if (this.exists(name)) {
            this.selected = this.selected.filter((item) => item !== name);
        } else {
            this.selected = [...this.selected, name];
        }
    }

    public getRoute(name: string): string[] {
        return [`../${name}/new`];
    }

    public exists(name: string): boolean {
        return !!~this.selected.indexOf(name);
    }

    public updateAssign(): void {
        this.update.emit({
            [this.section.type]: this.selected
        });
    }

    public cancelAssign(): void {
        this.cancel.emit();
    }
}