import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.models';
import { CLIENT_KEY } from '../config/config';

declare function init_plugins();
declare const gapi: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;
    rememberMe: boolean = false;
    auth2: any;

    constructor(private router: Router, private userService: UserService) {}

    ngOnInit(): void {
        init_plugins();
        this.googleInit();
        if (
            localStorage.getItem('rememberMe') &&
            localStorage.getItem('rememberMe') === 'true'
        ) {
            this.email = JSON.parse(localStorage.getItem('user'))['email'];
            this.rememberMe = true;
        } else {
            this.email = '';
            this.rememberMe = false;
        }
    }

    ingresar(loginForm: NgForm) {
        if (loginForm.invalid) {
            return;
        }

        let user = new User(null, this.email, this.password);
        this.userService.login(user, this.rememberMe).subscribe(
            response => {
                this.router.navigate(['/dashboard']);
            },
            error => {
                console.log(error);
            }
        );
    }

    googleInit() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: `${CLIENT_KEY}`,
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });

            this.attachSiging(document.getElementById('btnGoogle'));
        });
    }

    attachSiging(element) {
        this.auth2.attachClickHandler(element, {}, googleUser => {
            //let profile = googleUser.getBasicProfile();
            let token = googleUser.getAuthResponse().id_token;
            //console.log(token);
            this.userService.loginGoogle(token).subscribe(response => {
                //console.log(response);
                //this.router.navigate(['/dashboard']);
                window.location.href = '#/dashboard';
            });
        });
    }
}
