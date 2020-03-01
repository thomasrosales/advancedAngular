import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/settings.index';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/models/user.models';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent implements OnInit {
    user: User;

    constructor(
        public sidebarServide: SidebarService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.user = this.userService.user;
        this.sidebarServide.loadMenu();
    }

    logout() {
        this.userService.logout();
    }
}
