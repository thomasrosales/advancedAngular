import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicOneComponent } from './graphic-one/graphic-one.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/guards/login.guard';
import { AdminGuard } from '../services/guards/admin.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { FinderComponent } from './finder/finder.component';

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
                path: 'profile',
                component: ProfileComponent,
                data: { title: 'Profile' }
            },
            {
                path: 'promise',
                component: PromisesComponent,
                data: { title: 'Promise' }
            },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS' } },
            {
                path: 'finder/:filter',
                component: FinderComponent,
                data: { title: 'Finder' }
            },
            // MANTENIMIENTO
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [AdminGuard],
                data: { title: 'Users' }
            },
            {
                path: 'hospitals',
                component: HospitalsComponent,
                canActivate: [AdminGuard],
                data: { title: 'Hospitals' }
            },
            {
                path: 'doctors',
                component: DoctorsComponent,
                canActivate: [AdminGuard],
                data: { title: 'Doctors' }
            },
            {
                path: 'doctor/:id',
                component: DoctorComponent,
                canActivate: [AdminGuard],
                data: { title: 'Update Doctor' }
            },
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
