import { Component,OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'course-eval-form',
    templateUrl: './course-eval-form.html',

})
export class CourseEvalForm implements OnInit{
    constructor() {
        
    }
    @Input('heading') sectionHeading = null 
    @Input() question = null;
    @Input() percentage = null;
    @Input() _id = null;
    @Input() index = null;
    @Input() options = null;
    @Input() canComment = true;
    @Output() quizReplied = new EventEmitter();
    @Output() commentsReplied = new EventEmitter();
    // options: Array<String> = ['Strongly Disagree', 'Disagree', 'Uncertain', 'Agree', 'Strongly Agree'];
    
    ngOnInit(){
        this.options = this.question.options;
        
    }
    optionSelected(id, value, selection, question){             
        this.quizReplied.emit({
            id, value, selection,question
        })
    }
    getTextValue(id, value,question){
        this.commentsReplied.emit({
            id, value, question
        })
    }
}