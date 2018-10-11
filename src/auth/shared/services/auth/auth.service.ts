import { Injectable } from '@angular/core';

import { Store } from 'store';

import 'rxjs/add/operator/do';

// third-party
import { AngularFireAuth } from 'angularfire2/auth';

export interface User {
    email: string;
    uid: string;
    authenticated: boolean;
}

@Injectable()
export class AuthService {
    public auth$ = this.af.authState
        .do(next => {
            if (!next) {
                this.store.set('user', null);
                return;
            }

            const user: User = {
                email: next.email,
                uid: next.uid,
                authenticated: true
            };
            this.store.set('user', user);
        })
    /**
     *
     */
    constructor(private store: Store, private af: AngularFireAuth) {}

    get user() {
        return this.af.auth.currentUser;
    }
    
    get authState() {
        return this.af.authState;
    }

    public createUser(email: string, password: string) {
        return this.af.auth
            .createUserWithEmailAndPassword(email, password);
    }

    public loginUser(email: string, password: string) {
        return this.af.auth
            .signInWithEmailAndPassword(email, password);
    }

    public logoutUser() {
        return this.af.auth.signOut();
    }
}