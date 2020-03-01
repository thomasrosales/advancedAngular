import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../settings.index';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate() {
        if (this.userService.user.rol === 'ADMIN_ROL') {
            return true;
        } else {
            console.log('BLOQUED');
            this.userService.logout();
            //this.router.navigate(['/login']);
            return false;
        }
    }
}
