import { Component, ViewChild, Output, EventEmitter, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { map, reverse } from "lodash";
import { Router } from "@angular/router";

import { SURVEY_LIST, 
        Departments, 
        TEACHER_DETAILS_BY_DEPARTMENT, 
        TEACHER_DETAILS_BY_NAME,
        DOWNLOAD_EXCEL
} from './../../../shared/global-vars';
import { SharedService } from "./../../../shared/shared.service";
import { TeacherListItem, DeparmentsListItemModel } from './../../../shared/models';
import { modalOptionsModel } from './../../../modal/modal.interface';
import { ModalComponent } from '../../../modal/modal.component';
@Component({
      selector: 'surveys',
      templateUrl: './surveys.template.html',
      styleUrls: [
        `./surveys.component.css`
      ]
  })
  export class SurveysComponent implements OnInit {

    @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;

    modalPurpose          : string;
    openModal             : boolean;
    surveyReferencesList  : {}[];
    length                : any;
    showLoader            : boolean;
    teachersList          : Array<TeacherListItem>;
    timeToFetch           : number | string                 = null;
    showTeachersList      : boolean                         = false;
    deparmentsList        : Array<DeparmentsListItemModel>  = Departments;
    surveyDetails         : Map<string, any>                = new Map();
    @Output('surveyId') 
      SurveyId            : EventEmitter<number>  = new EventEmitter<number>();
    optimize              :boolean;
    surveysArray;

    onOptimize(teacher){
      this.showSurvey(teacher, this.optimize);
    }
    ngOnInit(){
      let start = Date.now();              
      this.sharedService.getCall(SURVEY_LIST)
      .map(res => reverse(res))
      .subscribe(
        next => {
          this.surveysArray = next;
          this.length = this.surveysArray.length;
          // this.sharedService.sendSurvey(next);
        },
        console.error
      );
      let end = Date.now();
      this.timeToFetch = end - start;
    }
    constructor(private _router       : Router, 
                private sharedService : SharedService,
                private _cfr          : ComponentFactoryResolver){
    }
    getNextList(entity: string, value: string){
      let URL = entity === 'teachers' && value != "0"? 
        TEACHER_DETAILS_BY_DEPARTMENT + value 
        :
        '';
      if(value != "0"){
        this.surveyDetails.set('dept', value);
        this.showTeachersList = true;
        this.sharedService.getCall(URL)
          .subscribe(
            next => {
              this.showTeachersList = true;
              this.teachersList = next;
            },
            err => console.error(err)
          )
        }else{
          this.showTeachersList = false;
        }
      }
        
    viewSurvey(id){
      this.SurveyId.emit(id);  
    }

    showSurvey(teacherName: string, optimize){
      this.surveyDetails.set('teacher', teacherName);
      let selectedTeacher: Object = {};
      let singleSurveys = [];
      let start = Date.now()
      if(teacherName !== '0'){
        this.loaderState(true);
        selectedTeacher = (this.teachersList.filter(teacher => teacher["fullname"] === teacherName))[0];
        this.surveysArray = selectedTeacher["surveys"];

        // Should be used to avoid overhead.
        this.surveyReferencesList = map(this.surveysArray, '_reference');
        let list = {
          list: this.surveyReferencesList
        };
        list["optimize"] = optimize;
        this.sharedService.postCall(SURVEY_LIST, list)
          .map(res => res.json().reverse())
          .subscribe(     
            result => {
                this.surveysArray = (result)
                // this.sharedService.sendSurvey(result);
              },
            err => {console.error(err); setTimeout(this.loaderState(false), 2500)},
            () => setTimeout(this.loaderState(false), 2500)
          );
        this.length = this.surveysArray.length;
      }
      let end = Date.now();
      this.timeToFetch = end - start;
    }
    
    loaderState(hidden: boolean){
      this.showLoader = hidden;
    }
    downloadCSV($event){
      let modalOptions: modalOptionsModel = {
        metaData: {
          chaining: false,
          labels: false,
          setOnTop: true
        },
        header: 'Generate Excel',
        body: [{
                type: 'text',
                label: 'Enter Batch',
                placeholder: 'Enter Batch',
                id: 'batch'
            },{
                type: 'text',
                label: 'Enter Subject',
                placeholder: 'Enter Subject',
                id: 'subject'
            }
        ],
        footer: [{
                type: 'button',
                label: 'Submit',
                id: 'submit',
                icon: 'fa fa-check'
            },{
                type: 'button',
                label: 'Cancel',
                id: 'cancel',
                icon: 'fa fa-times'
            }
        ]
      };
      this.container.clear();
      // check and resolve the component
      let comp = this._cfr.resolveComponentFactory(ModalComponent);
      // Create component inside container
      let modalComponent = this.container.createComponent(comp);
      
      modalComponent.instance["_ref"] = modalComponent;
      modalComponent.instance.options = modalOptions;
      
      
      modalComponent.instance.output
        .subscribe( output => {
            if(output.get('status') != 'cancel'){
                let batch = !!output.get("batch") ? `&batch=${output.get("batch")}` : '',
                  subject = !!output.get("subject") ? `&subject=${output.get("subject")}`: '',
                  URL     = `${DOWNLOAD_EXCEL}?teacher=${this.surveyDetails.get("teacher")}&dept=${this.surveyDetails.get("dept")}${batch}${subject}`;  
                window.open(URL, '__blank');
            }

      });
      
    }

    showSingleSurvey(survey){
      this.sharedService.sendSurvey(survey)
      this._router.navigate(['/dashboard/survey'])
    }
  }