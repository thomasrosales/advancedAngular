import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicOneComponent } from './graphic-one/graphic-one.component';

import { SharedModule } from './../shared/shared.module';
import { PAGES_ROUTES } from './pages-routing.module';
import { AdderComponent } from '../components/adder/adder.component';
import { GraphicDoughnutComponent } from '../components/graphic-doughnut/graphic-doughnut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { FinderComponent } from './finder/finder.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        GraphicOneComponent,
        //PagesComponent,
        AdderComponent,
        GraphicDoughnutComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        //ModalUploadComponent,
        HospitalsComponent,
        DoctorsComponent,
        DoctorComponent,
        FinderComponent
    ],
    imports: [
        PAGES_ROUTES,
        SharedModule,
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        GraphicOneComponent
        //PagesComponent
    ],
    providers: []
})
export class PagesModule {}
