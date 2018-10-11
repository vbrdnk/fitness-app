import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// services
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
    selector: 'login',
    styleUrls: ['login.component.scss'],
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    public error: string;
    /**
     *
     */
    constructor(private authService: AuthService, private router: Router) {
        
    }

    public async loginUser(event: FormGroup) {
        const { email, password }  = event.value;
        try {
            await this.authService.loginUser(email, password);
            this.router.navigate(['/']);
        } catch (error) {
            this.error = error.message;
        }
    }
}