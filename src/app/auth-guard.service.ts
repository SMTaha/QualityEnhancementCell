import { LoginComponent } from './components/login/login.component';
import { SharedService } from './shared/shared.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    
    constructor(private authService: SharedService, 
                private router: Router){

    }
    canActivate(){
        if(this.authService.isLoggedIn()) {
            console.log('Authenticated');
            return true;
        }
        else this.router.navigate(['/login']);

        console.log('i am checking to see if you are logged in');
    }
    canActivateChild() {
        if(this.authService.isLoggedIn()) {
            console.log('Child Authenticated');
            return true;
        }
        else this.router.navigate(['/login']);
        console.log('checking child route access');
    }
}

@Injectable()
export class SessionGuard implements CanActivate{
    constructor(private authService: SharedService, 
        private router: Router){

    }
    canActivate(){
        if(!this.authService.isLoggedIn()) {
            console.log('Not Authenticated');
            return true;
    }
    else this.router.navigate(['/dashboard']);

    console.log('i am checking to see if you are logged in');
    }
}