import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BASE_URL } from '../../config/config';
import { User } from '../../models/user.models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    user: User;
    token: string;

    constructor(private http: HttpClient, private router: Router) {
        this.loadLocalStorage();
    }

    userCreate(user: User) {
        const url = `${BASE_URL}/user`;
        return this.http.post(url, user).pipe(
            map((response: any) => {
                return response.user;
            })
        );
    }

    logout() {
        this.user = null;
        this.token = '';
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
        this.router.navigate(['/login']);
    }

    login(user: User, rememberMe: boolean) {
        const url = `${BASE_URL}/login`;
        return this.http.post(url, user).pipe(
            map((response: any) => {
                localStorage.setItem('id', response.id);
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
                this.loadLocalStorage();
                return true;
            })
        );
    }

    //http://localhost:3000/login/google
    loginGoogle(token: string) {
        const url = `${BASE_URL}/login/google`;
        return this.http.post(url, { token }).pipe(
            map((response: any) => {
                console.log(response);
                this.saveLocalStorage(response.user._id, token, response.user);
                return response;
            })
        );
    }

    isAuthenticated() {
        if (this.token.length > 5) {
            return true;
        }
        return false;
    }

    loadLocalStorage() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.user = JSON.parse(localStorage.getItem('user'));
        } else {
            this.token = '';
            this.user = null;
        }
    }

    saveLocalStorage(id: string, token: string, user: User) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.user = user;
        this.token = token;
    }

    // http://localhost:3000/user/5e56bf0923044a6c8504c22b?token={{Token}}
    updateUser(newUser: User) {
        const url = `${BASE_URL}/user/${newUser._id}?token=${this.token}`;
        return this.http.put(url, newUser).pipe(
            map((response: any) => {
                this.saveLocalStorage(newUser._id, this.token, newUser);
                Swal.fire({
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });
                return true;
            })
        );
    }

    //http://localhost:3000/user?offset=0
    getUsers(offset: number = 0) {
        const url = `${BASE_URL}/user?offset=${offset}`;
        return this.http.get(url);
    }

    //http://localhost:3000/find/collection/user/tes
    findUsers(filter: string) {
        const url = `${BASE_URL}/find/collection/user/${filter}`;
        return this.http.get(url);
    }
}
