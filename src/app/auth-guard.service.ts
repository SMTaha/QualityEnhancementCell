import { LoginComponent } from './components/login/login.component';
import { SharedService } from './shared/shared.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from "@angular/router";
// import { Observable } from "rxjs/Observable";
import { BehaviorSubject, Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/fromPromise';
import * as localforage from 'localforage';

interface User {
    _id: string,
    rollnumber ?: string,
    email ?: string,
    contact: string,
    password ?: string | null;
}

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    private subject = new BehaviorSubject<User>(null);
    user$: Observable<User> = this.subject.asObservable();
    isLoggedIn$: Observable <boolean> = null; //this.user$.map(user => !!user._id);
    isLoggedOut$: Observable <boolean> = null; //this.isLoggedIn$.map(isLoggedIn => ! isLoggedIn);

    constructor(
        private authService: SharedService, 
        private router: Router
        ){}
        
    canActivate(){
        if(this.authService.isLoggedIn()) {
            return true;
        }
        else this.router.navigate(['/login']);
    }
    canActivateChild() {
        this.isLoggedIn$ = 
           Observable.fromPromise(new Promise((resolve, reject)=>{
                  
           }))

        if(this.authService.isLoggedIn()) {
            return true;
        }
        else this.router.navigate(['/login']);
    }
}

@Injectable()
export class SessionGuard implements CanActivate{
    constructor(private authService: SharedService, 
        private router: Router){

    }
    canActivate(){
        if(!this.authService.isLoggedIn()) {
            return true;
    }
    else 
        this.router.navigate(['/dashboard']);
    }
}
