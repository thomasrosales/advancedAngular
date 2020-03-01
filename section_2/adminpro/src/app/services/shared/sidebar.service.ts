import { Injectable, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    menu: any = [];
    /*menu: any = [
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
    ];*/
    constructor(private userService: UserService) {}

    loadMenu() {
        this.menu = this.userService.menu;
    }
}
