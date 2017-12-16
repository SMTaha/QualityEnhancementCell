import { SIGNUP_URL, Departments } from './../../shared/global-vars';
import { StudentModel } from './../../shared/models';
import { Router } from '@angular/router';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    templateUrl: './signup.template.html',
    styleUrls: ['./signup.component.css'],
    providers: [
        SharedService
    ]
})

export class SignupComponent implements OnInit{

    showMessage:            boolean         = false;
    signupErrorMessage:     string          = '';
    signupError:            boolean         = false;
    departments:            Array<Object>   = Departments;   
    signUpContainer:        HTMLElement     = document.getElementById('signup-container');
    userCredentials:        StudentModel    = { fullname: '', department: '', rollnumber: '', password: '' }
    
    constructor(public router: Router,
                private sharedService: SharedService){}
    
    ngOnInit(){
    }

    loging(value){
        this.userCredentials.department = value;
    }
    
    validateCredentials(){
        return this.userCredentials.fullname    && this.userCredentials.department != "0"
            && this.userCredentials.rollnumber  && this.userCredentials.password;
    }
    
    signUp(){
        if(this.validateCredentials){
            this.sharedService.postCall(SIGNUP_URL, this.userCredentials)
                .map(res => res.json())
                .subscribe(res => {
                    console.log(res);                    
                    clearFields();
                    setTimeout(()=>{
                        this.router.navigate(['/login']);
                    }, 3000);
                    if(res.status == 201) {
                    }
                }, err => {
                    let signUpContainer: HTMLElement    = document.getElementById('signup-container');
                    this.signupError        = true;
                    this.signupErrorMessage = err['_body'];
                    setTimeout(()=>{
                        this.signupError    = false;
                        signUpContainer.classList.remove('wobble');
                    }, 5000);
                    setTimeout(() => {
                        signUpContainer.classList.add('wobble');
                    }, 100);
                    clearFields();
                })
                let clearFields = () => {
                    this.userCredentials = { fullname: '', rollnumber: '', department: '' };
                }

        } 
    }
}