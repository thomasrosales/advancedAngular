import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.models';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styles: []
})
export class UsersComponent implements OnInit {
    users: User[] = [];
    from: number = 0;
    totalUsers: number = 0;
    loadingFlag: boolean = false;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loadingUsers();
    }

    loadingUsers(offset?: number) {
        this.loadingFlag = true;
        if (!offset) {
            offset = this.from;
        }
        this.userService.getUsers(offset).subscribe(response => {
            this.totalUsers = response['total'];
            this.users = response['users'];
        });
        this.loadingFlag = false;
    }

    after() {
        if (this.from <= 0) {
            this.from = 0;
        } else {
            this.from -= 5;
        }
        this.loadingUsers();
    }

    next() {
        if (this.from >= this.totalUsers) {
            this.loadingUsers(3);
            return;
        } else {
            this.from += 5;
        }
        this.loadingUsers();
    }

    findUser(filter: string) {
        this.loadingFlag = true;
        this.userService.findUsers(filter).subscribe(response => {
            this.users = response['users'];
            this.totalUsers = this.users.length;
        });
        this.loadingFlag = false;
    }
}
