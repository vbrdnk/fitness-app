import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import 'rxjs/add/operator/map';

import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
    /**
     *
     */
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(): Observable<boolean> {
        return this.authService.authState
            .map((user) => {
                if (!user) {
                    this.router.navigate(['/auth/login']);
                }

                return !!user;
            });
    }
}