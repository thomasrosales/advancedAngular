import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/models/user.models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: []
})
export class HeaderComponent implements OnInit {
    user: User;

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.user = this.userService.user;
    }

    logout() {
        this.userService.logout();
    }

    find(filter: string) {
        this.router.navigate(['/finder', filter]);
    }
}
