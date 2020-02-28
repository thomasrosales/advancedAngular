import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/models/user.models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: []
})
export class HeaderComponent implements OnInit {
    user: User;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.user = this.userService.user;
    }

    logout() {
        this.userService.logout();
    }
}
