import { Component, Input } from '@angular/core';
import { Meal } from '../../services/meals/meals.service';

@Component({
    selector: 'list-item',
    styleUrls: ['list-item.component.scss'],
    templateUrl: 'list-item.component.html'
})
export class ListItemComponent {
    @Input() item: any;
    
    constructor() {
    }
}