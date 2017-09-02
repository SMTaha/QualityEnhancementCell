import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import * as  localforage from 'localforage';
import 'rxjs/add/operator/map';
@Injectable()
export class SharedService{
    constructor(private http: Http){

    }
    
    getCall(url: string, options?){
        return this.http.get(url, options)
            .map(response => response.json());
    }

    postCall(url: string, body: any, options?){

        return this.http.post(url, body, options)
            // .map(response => response.json());
    }

    isLoggedIn(){
        return !!localforage.getItem('activeUser');
    }



}