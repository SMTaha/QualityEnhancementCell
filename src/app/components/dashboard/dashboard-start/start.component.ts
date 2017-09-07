import { Router } from '@angular/router';
import { TEACHER_DETAILS_URL } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentModel } from "./../../../shared/models";
import { TeacherModel } from "./../../../shared/models";

@Component({
    templateUrl: './start.template.html',
    styleUrls:[ '../../login/login.component.css' ]
})
export class StartSurveyComponent implements OnInit {
    year: number;
    month: String;
    teachers: boolean;
    teachersList;
    selectedDepartment: string = '';
    selectedTeacher: string = '';
    subject: string;
    subjects: boolean;
    subjectsList;
    surveyMetaData = {
        evaluation: "teacher",
        target: "",
    }
    @ViewChild('dept') deptReference;  
    months:Array<String> = ["January", "February", "March", "April", "May", "June","July","August", "September", "October", "November", "December"];
    constructor(private sharedService: SharedService,
                private router: Router) { 
        this.year = new Date().getFullYear();
        this.month = this.months[new Date().getMonth()];
    }

    getDepartmentTeacherList(department){
        this.sharedService.postCall(TEACHER_DETAILS_URL, {department: department})
            .subscribe( res => {
                if(res.status == 302) {
                    this.teachersList = res["_body"];
                    this.teachers = false;
                    console.log(this.teachersList);
                }
            }, err => {
                console.log(err);
                this.teachersList = JSON.parse(err["_body"])["body"];
                console.log(typeof(this.teachersList), this.teachersList);
                this.teachers = true;
            });
    }
    getSubjectList(selectedTeacher){ // need to rewrite with real logic, bluffing DOM for now.
        this.subjects = !selectedTeacher ? false : true;
        this.surveyMetaData.target= selectedTeacher;
        console.log(this.surveyMetaData);
        
        console.log(this.subjects, selectedTeacher);
        // this.subjects = ['1',','3']; 
        let teacherObject = (this.teachersList).find(o => o["fullname"] === selectedTeacher) ;
        this.subjectsList = teacherObject ? teacherObject["subjects"] : undefined;
        console.log(this.subjectsList);
    }
    selectedSubject(selectedSubject){
        this.subject = selectedSubject;
    }
    validate(){
        return !!this.subject;
    }
    startSession(){
        console.log('Starting Session');
        console.log(this.validate());
        
        if(this.validate()){
            // this.surveyMetaData.target = this.selectedTeacher;
            console.log(this.surveyMetaData.target);
            localStorage.setItem('surveyMetaData', JSON.stringify(this.surveyMetaData))
            this.router.navigate(['survey']);
        }
    }

    ngOnInit() {
        let activeUser: StudentModel = JSON.parse(localStorage.getItem('activeUser'));
        console.log(activeUser);
        this.selectedDepartment = activeUser.department;
        console.log(this.selectedDepartment);
        this.getDepartmentTeacherList(this.selectedDepartment);
        // console.log(this.deptReference)
        // let node = this.deptReference.nativeElement;
        // node.value = this.selectedDepartment;
     }
}