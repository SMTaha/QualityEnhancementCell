import { SettingsComponent } from './components/dashboard/dashboard-settings/settings.component';
import { DashboardSurveyComponent } from './components/dashboard/dashboard-survey/dashboard-survey.component';
import { SurveysComponent } from './components/dashboard/dashboard-surveys/surveys.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard, SessionGuard } from './auth-guard.service';
import { RouterModule, Routes, Route} from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component'
import { LoginComponent } from './components/login/login.component';
import { PlaceHolderComponent } from './components/dashboard/dashboard-placeholder/placeholder.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { NavBarComponent } from './components/nav-bar/navbar.component';
import { RankingComponent } from './components/dashboard/dashboard-ranking/ranking.component'
import { StartSurveyComponent } from './components/dashboard/dashboard-start/start.component'
import { StatsComponent } from "./components/dashboard/dashboard-stats/stats.component";


const fallback: Route = {
    path: '**',
    component: LoginComponent
}

export const routes: Routes = [
    {path: 'survey', canActivate:[AuthGuard], component: MainFormComponent },
    {path: 'dashboard', canActivate:[AuthGuard], canActivateChild:[AuthGuard], component: DashboardComponent,
    children:[
        {path:'start', component: StartSurveyComponent },
        {path:'rankings', component: RankingComponent },
        {path:'stats', component: StatsComponent },
        {path: 'view-surveys', component: SurveysComponent },
        {path: 'view-surveys/:id', component: DashboardSurveyComponent },
        {path: 'settings', component: SettingsComponent },
        {path: '', component: PlaceHolderComponent }

        ]
    },
    {path: 'login', canActivate:[SessionGuard], component: LoginComponent },
    {path: 'signup', canActivate:[SessionGuard], component: SignupComponent },
    {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    fallback
]

export const routing = RouterModule.forRoot(routes, {useHash: false});