import { TeacherEvaluationForm, courseEvaluationForm } from './../../shared/forms/teacher-evaluation-form';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { sortBy } from "lodash";

import { QuestionComponent } from './quest.component';
import { CourseEvalForm } from "./course-eval-form.component";
import { SharedService } from '../../shared/shared.service';
import { GET_SURVEY, ADD_SURVEY_URL, Departments } from '../../shared/global-vars';

interface SurveyModel {
    _id: number, 
    reply: string,
    value: number,
    question: string
}; 
interface FinalSurveyModel { 
    studentId: number, 
    batch: number, 
    dept: string, 
    evaluation: string; 
    course: string; 
    teacher: string; 
    survey: SurveyModel[]; 
}

@Component({
    selector: 'main-form',
    templateUrl: './main-form.html',
    styleUrls: ['main.component.css'],
    providers: [SharedService]
})


export class MainFormComponent implements OnInit{
    finalSurveyDetails: FinalSurveyModel; //DOM Binding
    purpose: string;
    openModal: any;
    constructor(private _sharedService: SharedService, private router: Router) { }
    surveyComplete = false;
    selectedTeacher: string = '';
    selectedDepartment: string = '';
    subject: string = null;
    surveyMetaData;
    questions: Array<Object> = null;
    survey: Array<SurveyModel> = []; 
    showMessage: boolean = false;
    ngOnInit(){
        this.surveyMetaData = JSON.parse(localStorage.getItem('surveyMetaData'));
        this.selectedTeacher = this.surveyMetaData.teacher || this.surveyMetaData.target;
        this.subject = this.surveyMetaData.course; 
        this.selectedDepartment = JSON.parse(localStorage.getItem('activeUser'))["department"];
        this.selectedDepartment = (Departments.find(o => (o as any).value == this.selectedDepartment))["name"];                
        this.getSurveys();
                
    }
    getSurveys(){
        this._sharedService.getCall(GET_SURVEY + this.surveyMetaData.evaluation)
            .subscribe(
                next => {
                    this.questions = next.sections;
                },
                console.error
            )
    }
    optionSelected(event: SurveyModel){
        let indexOfEvent = this.survey.findIndex((surveyElement:any) => surveyElement.id == (event as any).id);
        if(indexOfEvent === -1){
            this.survey.push(event)
        }else{
            this.survey[indexOfEvent] = event;
        }
        
    }
    checkSurveyStatus(){
        let surveyDetails = {
            teacher: this.surveyMetaData.teacher,
            course: this.surveyMetaData.course,
            survey: this.survey
        }
        if(surveyDetails.survey.length === this.questions.length){
            return true
        }
    }
    getStudentRemarks(){  
        console.log(this.survey)
        console.log(sortBy(this.survey, [function(o) { 
            return typeof o.id  == 'number' ? o.id: null 
        }]))
        let rollnumber = JSON.parse(localStorage.getItem('activeUser'))["rollnumber"].split('-'),
            surveyDetails = {
                batch: rollnumber[1],
                dept: rollnumber[2], 
                studentId: rollnumber[3],
                evaluation: this.surveyMetaData.evaluation,    
                course: this.surveyMetaData.course,    
                teacher: this.surveyMetaData.teacher,
                survey: this.survey
            },
            lastSection = this.questions[this.questions.length - 1]["queries"],
            lastQID = lastSection[lastSection.length - 1]["qid"];
            console.log(surveyDetails);
        if(surveyDetails.survey.length >= lastQID){
            this.purpose = 'confirm';
            this.finalSurveyDetails = surveyDetails;
            this.confirmAndSend(this.purpose, true, surveyDetails)
            this.surveyComplete = true;
            // subscribe also takes and object as param, 
            // in which first key is successResponse, second is Error, third is onComplete Event
             
        }else{
            this.showMessage = true;
            setTimeout(() => {
                this.showMessage = false;
            }, 1500);
        }
    }
    modalState(value: boolean){
        this.openModal = value;
    }
    confirmAndSend(purpose, value, body){
        this.openModal = value;
           
    }
}
