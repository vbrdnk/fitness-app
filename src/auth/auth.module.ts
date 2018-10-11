import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 

// third-party modules 
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// shared module
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
    { path: 'auth', children: [
        { path: '', pathMatch: 'full', redirectTo: 'login' },
        { path: 'login', loadChildren: './login/login.module#LoginModule' },
        { path: 'register', loadChildren: './register/register.module#RegisterModule' }
    ] }
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDoAu2U5ftd9ioFT1IvUjTnsWznIKN3DrY",
  authDomain: "fitness-app-26cb1.firebaseapp.com",
  databaseURL: "https://fitness-app-26cb1.firebaseio.com",
  projectId: "fitness-app-26cb1",
  storageBucket: "fitness-app-26cb1.appspot.com",
  messagingSenderId: "70629252540"
};

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoot()
    ]
})
export class AuthModule {}