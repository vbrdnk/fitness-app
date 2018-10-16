import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'list-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['list-item.component.scss'],
    templateUrl: 'list-item.component.html'
})
export class ListItemComponent {
    @Input() item: any;
    @Output() remove: EventEmitter<any> = new EventEmitter<any>();
    public toggled: boolean = false;
    
    constructor() {
    }

    public getRoute(item: any): string[] {
        return [ `../meals`, item.$key ];
    }

    public toggle(): void {
        this.toggled = !this.toggled;
    }

    public removeItem(): void {
        this.remove.emit(this.item);
    }
}