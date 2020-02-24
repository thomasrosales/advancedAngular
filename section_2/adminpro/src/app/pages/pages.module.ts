import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicOneComponent } from './graphic-one/graphic-one.component';
import { PagesComponent } from './pages.component';

import { SharedModule} from './../shared/shared.module';
import { PAGES_ROUTES } from './pages-routing.module';
import { AdderComponent } from '../components/adder/adder.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        GraphicOneComponent,
        PagesComponent,
        AdderComponent
    ],
    imports: [
        PAGES_ROUTES,
        SharedModule,
        FormsModule
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        GraphicOneComponent,
        PagesComponent
    ],
    providers: [],
})
export class PagesModule {

}