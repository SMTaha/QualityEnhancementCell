import { SIGNUP_URL, Departments } from './../../shared/global-vars';
import { StudentModel, DeparmentsListItemModel } from './../../shared/models';
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

    errorClass              : string          = "text-danger";
    signupErrorMessage      : string          = '';

    showMessage             : boolean         = false;
    signupError             : boolean         = false;
    
    departments             : Array<DeparmentsListItemModel>   
                                              = Departments;   

    signUpContainer         : HTMLElement     = document.getElementById('signup-container');

    userCredentials         : StudentModel    = { fullname: '', rollnumber: '', department: '', password: '' }
    
    constructor(public router: Router,
                private sharedService: SharedService){}
    
    ngOnInit(){
    }

    loging(value){
        this.userCredentials.department = value;
    }
    
    validateCredentials(){
        return this.userCredentials.fullname    && this.userCredentials.department != "0"
            && this.userCredentials.password;
    }
    
    signUp(){
        if(this.validateCredentials){
            this.userCredentials.department = this.addDept(this.userCredentials.rollnumber);
            this.userCredentials.rollnumber = this.userCredentials.rollnumber.toUpperCase();
            this.sharedService.postCall(SIGNUP_URL, this.userCredentials)
                .subscribe(res => {
                    clearFields();
                    if(res.status == 201) {
                        this.errorClass         = "text-success";
                        this.signupError        = true;
                        this.signupErrorMessage = "Account Created. You can now login.";
                        
                        setTimeout( () => this.router.navigate(['/login']), 1500);
                    }
                }, err => {
                    this.errorClass = "text-danger";
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
                    this.userCredentials = { fullname: '', rollnumber: '', password: '' };
                }
        } 
    }
    addDept(rollnumber){
        rollnumber  = rollnumber.split('-');
        let dept    = rollnumber[2]; 
        console.log(dept)
        return dept;
    }
}