import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BASE_URLt, BASE_URL } from '../../config/config';
import { User } from '../../models/user.models';
import { Doctor } from '../../models/doctor.models';
import { Hospital } from 'src/app/models/hospital.models';

@Component({
    selector: 'app-finder',
    templateUrl: './finder.component.html',
    styles: []
})
export class FinderComponent implements OnInit {
    users: User[] = [];
    doctors: Doctor[] = [];
    hospitals: Hospital[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) {
        this.activatedRoute.params.subscribe(params => {
            let filter = params.filter;
            this.find(filter);
        });
    }

    ngOnInit(): void {}

    // http://localhost:3000/find/all/rob
    find(filter: string) {
        if (filter === '') {
            filter = 'a';
        }
        const url = `${BASE_URL}/find/all/${filter}`;
        this.http.get(url).subscribe((response: any) => {
            console.log(response);
            this.users = response.users;
            this.doctors = response.doctors;
            this.hospitals = response.hospitals;
        });
    }
}
