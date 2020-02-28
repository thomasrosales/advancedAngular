import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicOneComponent } from './graphic-one/graphic-one.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/guards/login.guard';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: { title: 'Dashboard' }
            },
            {
                path: 'progress',
                component: ProgressComponent,
                data: { title: 'Progress' }
            },
            {
                path: 'graphic',
                component: GraphicOneComponent,
                data: { title: 'Graphic' }
            },
            {
                path: 'settings',
                component: AccountSettingsComponent,
                data: { title: 'Settings' }
            },
            {
                path: 'promise',
                component: PromisesComponent,
                data: { title: 'Promise' }
            },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS' } },
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
