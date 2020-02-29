import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    menu: any = [
        {
            title: 'Section 1',
            icon: 'mdi mdi-gauge',
            submenu: [
                {
                    title: 'Dashboard',
                    url: '/dashboard'
                },
                {
                    title: 'Progress',
                    url: '/progress'
                },
                {
                    title: 'Graphic',
                    url: '/graphic'
                },
                {
                    title: 'Promise',
                    url: '/promise'
                },
                {
                    title: 'RXJS',
                    url: '/rxjs'
                }
            ]
        },
        {
            title: 'Section 2',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                {
                    title: 'Users',
                    url: '/users'
                },
                {
                    title: 'Doctors',
                    url: '/doctors'
                },
                {
                    title: 'Hospitals',
                    url: '/hospitals'
                }
            ]
        }
    ];
    constructor() {}
}
