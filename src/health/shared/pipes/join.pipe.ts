import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join'
})
export class JoinPipe implements PipeTransform {
    public transform(value: any): string {
        return Array.isArray(value) ? value.join(', ') : value;
    }
}