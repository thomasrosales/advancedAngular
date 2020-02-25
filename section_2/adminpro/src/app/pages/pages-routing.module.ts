import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicOneComponent } from './graphic-one/graphic-one.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          {path: 'dashboard', component: DashboardComponent},
          {path: 'progress', component: ProgressComponent},
          {path: 'graphic', component: GraphicOneComponent},
          {path: 'settings', component: AccountSettingsComponent},
          {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
        ]
      }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
