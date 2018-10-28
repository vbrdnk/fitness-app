import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'; 

import { Store } from 'store';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';

// services
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface ScheduleItem {
    meals: Meal[],
    workouts: Workout[],
    section: string,
    timestamp: number,
    $key?: string
}

export interface ScheduleList {
    morning?: ScheduleItem,
    lunch?: ScheduleItem,
    evening?: ScheduleItem,
    snacks?: ScheduleItem,
    [key: string]: any
}

@Injectable()
export class ScheduleService {
    private date$ = new BehaviorSubject(new Date());
    private section$ = new Subject();
    private itemList$ = new Subject();

    public items$ = this.itemList$
        .withLatestFrom(this.section$)
        .map(( [ items, section ]: any[]) => {
            console.log(items, section);
            const id = section.data.$key;

            const defaults: ScheduleItem = {
                workouts: null,
                meals: null,
                section: section.section,
                timestamp: new Date(section.day).getTime()
            };

            const payload = {
                ...(id ? section.data : defaults),
                ...items
            }

            if (id) {
                return this.updateSection(id, payload);
            } else {
                return this.createSection(payload);
            }
        });

    public selected$ = this.section$
        .do((next: any) => this.store.set('selected', next));

    public list$ = this.section$
        .map((value: any) => this.store.value[value.type])
        .do((next: any) => this.store.set('list', next));

    public schedule$: Observable<ScheduleItem[]> = this.date$
        .do((next: any) => this.store.set('date', next))
        .map((day: any) => {
            const startAt = (
                new Date(day.getFullYear(), day.getMonth(), day.getDate())
            ).getTime();

            const endAt = (
                new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
            ).getTime() - 1;

            return { startAt, endAt };
        })
        .switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt))
        .map((data: any) => {
            const mapped: ScheduleList = {};

            for (const prop of data) {
                if (!mapped[prop.section]) {
                    mapped[prop.section] = prop;
                }
            }

            return mapped;
        })
        .do((next: any) => this.store.set('schedule', next));

    constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) {}

    get uid(): string {
        return this.authService.user.uid;
    }

    public updateItems(items: string[]): void {
        this.itemList$.next(items);
    }

    public updateDate(date: Date): void {
        this.date$.next(date);
    }

    public selectSection(event: any): void {
        this.section$.next(event);
    }

    private createSection(payload: ScheduleItem): any {
        return this.db.list(`schedule/${this.uid}`).push(payload);
    }

    private updateSection(key: string, payload: ScheduleItem): any {
        return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
    }

    private getSchedule(startAt: number, endAt: number) {
        return this.db.list(`schedule/${this.uid}`, {
            query: {
                orderByChild: 'timestamp',
                startAt,
                endAt
            }
        });
    }

}