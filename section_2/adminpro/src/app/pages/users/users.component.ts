import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.models';
import { UserService } from '../../services/user/user.service';
import Swal from 'sweetalert2';

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

    deleteUser(user: User) {
        //USUARIO LOGGEADO
        if (user._id === this.userService.user._id) {
            Swal.fire({
                icon: 'error',
                title: 'You can not delete your self !',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.value) {
                this.userService.deleteUser(user._id).subscribe(response => {
                    this.loadingUsers();
                });
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
        });
    }

    saveUser(user: User) {
        if (user._id === this.userService.user._id) {
            Swal.fire({
                icon: 'error',
                title: 'You can not update your self priority !',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        this.userService.updateUser(user).subscribe();
    }
}
