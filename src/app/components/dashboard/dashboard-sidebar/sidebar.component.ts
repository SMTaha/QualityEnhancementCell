import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard-sidebar',
    styles:[`
    a: hover {
        text-decoration: none !important;
        // border-bottom:none!important;
    }
    .sidenav-text{
        padding: 2px;
        border-radius: 20px;
        text-align:center;
        
    }
    .sidenav-item{
        border-radius: 5px;
        text-align: center;
        color: #666;
    }

    .active-link > li > .fa, .active-link > li > .sidenav-text  {
        color: #337ab7 !important;
    }
    .side-option{
        padding: 15px 0;
    }
    .side-option: hover{ 
        text-decoration: none !important;
    }
`],
    template: `
    <div class="sidebar">
          <ul class="nav nav-sidebar">
            <a *ngIf="user === 'student'" class="col-xs-12 col-md-12 side-option" title="Start Survey" routerLinkActive="active-link" routerLink="start">
                <li class="sidenav-item">
                        <div class="fa fa-pencil fa-3x active"></div>
                        <div class="sidenav-text">Start Survey</div>
                </li>
            </a>
            <div *ngIf="user === 'admin'">
                <a class="col-xs-12 col-md-12 side-option" title="View Surveys" routerLinkActive="active-link" routerLink="view-surveys">
                    <li class="sidenav-item">
                            <div class="fa fa-check-square-o fa-3x active"></div>
                            <div class="sidenav-text">View Surveys</div>
                    </li>
                </a>
                <a *ngIf="null" class="col-xs-12 col-md-12 side-option" title="Rankings" routerLinkActive="active-link" routerLink="rankings">
                    <li class="sidenav-item">
                            <div class="fa fa-trophy fa-3x active"></div>
                            <div class="sidenav-text">Rankings</div>
                    </li>
                </a>
                <a class="col-xs-12 col-md-12 side-option" title="Statistics" routerLinkActive="active-link" routerLink="stats">
                    <li class="sidenav-item">
                            <div class="fa fa-line-chart fa-3x active"></div>
                            <div class="sidenav-text">Statistics</div>
                    </li>
                </a>
                <a class="col-xs-12 col-md-12 side-option" title="Settings" routerLinkActive="active-link" routerLink="settings">
                    <li class=" sidenav-item">
                            <div class="fa fa-gears fa-3x active"></div>
                            <div class="sidenav-text">Settings</div>
                    </li>
                </a>
            </div>
            <a style="cursor: pointer; cursor: hand" class="col-xs-12 col-md-12 side-option" title="Logout" routerLinkActive="active-link" (click)="logout()">
            <li class=" sidenav-item">
                    <div class="fa fa-sign-out fa-3x active"></div>
                    <div class="sidenav-text">Logout</div>
            </li>
        </a>
          </ul>
        </div>`
})  
export class DashboardSidebarComponent implements OnInit {
    user: Object;
    constructor(private router: Router) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('activeUser'))
                        .hasOwnProperty('email') ? 
                        'admin' : 'student'
        
     }

    logout(){
        localStorage.clear();
        setTimeout(() => {
            this.router.navigate(['/login']);
        }, 500);
    }
}