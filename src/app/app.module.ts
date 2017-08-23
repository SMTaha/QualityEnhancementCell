import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './main.router'

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { DashboardSidebarComponent } from './dashboard/dashboard-sidebar/sidebar.component';
import { LoginComponent } from './login/login.component'
import { MainFormComponent } from './main-form/main-form.component';
import { NavBarComponent } from './nav-bar/navbar.component';
import { PlaceHolderComponent } from './dashboard/dashboard-placeholder/placeholder.component';
import { QuestionComponent } from './main-form//quest.component';
import { RankingComponent } from './dashboard/dashboard-ranking/ranking.component'
import { StartSurveyComponent } from './dashboard/dashboard-start/start.component'


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardSidebarComponent,
    LoginComponent,
    MainFormComponent,
    NavBarComponent,
    PlaceHolderComponent,
    QuestionComponent,
    RankingComponent,
    StartSurveyComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
