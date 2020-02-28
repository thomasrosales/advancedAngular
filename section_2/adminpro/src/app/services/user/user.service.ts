import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BASE_URL } from '../../config/config';
import { User } from '../../models/user.models';
import { Router } from '@angular/router';

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
                return true;
            })
        );
    }

    //http://localhost:3000/login/google
    loginGoogle(token: string) {
        const url = `${BASE_URL}/login/google`;
        return this.http.post(url, { token });
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
}
