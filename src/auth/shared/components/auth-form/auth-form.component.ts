import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'auth-form',
    styleUrls: ['auth-form.component.scss'],
    templateUrl: 'auth-form.component.html'
})
export class AuthFormComponent {
    @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
    public form: FormGroup = this.fb.group({
        email: ['', Validators.email],
        password: ['', Validators.required]
    });
    /**
     *
     */
    constructor(private fb: FormBuilder) {}

    get passwordInvalid(): boolean {
        const control = this.form.get('password');
        return control.hasError('required') && control.touched;
    }

    get emailFormat(): boolean {
        const control = this.form.get('email');
        return control.hasError('email') && control.touched;
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.submitted.emit(this.form);
        }
    }
}