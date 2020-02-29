import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class DoctorsService {
    totalDoctors: number;

    constructor(private http: HttpClient, private userService: UserService) {}

    // http://localhost:3000/doctor?offset=0
    loadDoctors() {
        const url = `${BASE_URL}/doctor`;
        return this.http.get(url).pipe(
            map((response: any) => {
                this.totalDoctors = response.total;
                return response.doctors;
            })
        );
    }

    findDoctor(filter: string) {
        const url = `${BASE_URL}/find/collection/doctor/${filter}`;
        return this.http.get(url).pipe(
            map((response: any) => {
                return response.doctors;
            })
        );
    }

    // http://localhost:3000/doctor/5e56d389e657b40a887830aa?token={{Token}}
    deleteDoctor(id: string) {
        const url = `${BASE_URL}/doctor/${id}?token=${this.userService.token}`;
        return this.http.delete(url).pipe(
            map(response => {
                return true;
            })
        );
    }
}
