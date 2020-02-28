import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UserService } from '../../services/settings.index';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: []
})
export class ProfileComponent implements OnInit {
    user: User;

    constructor(private userService: UserService) {
        this.user = userService.user;
    }

    ngOnInit(): void {}

    save(newUser: any) {
        this.user.nombre = newUser.username;
        this.user.email = newUser.useremail;
        this.userService.updateUser(this.user).subscribe(
            response => {
                console.log('ok');
            },
            error => {
                console.log(error);
            }
        );
    }
}
