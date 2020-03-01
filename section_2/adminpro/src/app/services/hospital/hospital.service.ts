import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.models';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class HospitalService {
    constructor(private http: HttpClient, private userService: UserService) {}

    //http://localhost:3000/hospital/{{Id}}?token={{Token}}
    getHospital(id: string) {
        const url = `${BASE_URL}/hospital/${id}?token=${this.userService.token}`;
        return this.http.get(url);
    }

    //http://localhost:3000/hospital?offset=0
    loadHospitals(offset?: number) {
        const url = `${BASE_URL}/hospital`;
        return this.http.get(url);
    }

    // http://localhost:3000/find/collection/user/tes
    findHospital(filter: string) {
        const url = `${BASE_URL}/find/collection/hospital/${filter}`;
        return this.http.get(url);
    }

    //http://localhost:3000/hospital?token={{Token}}
    createHospital(name: string) {
        const hospital = new Hospital(name, null, this.userService.user);
        const url = `${BASE_URL}/hospital?token=${this.userService.token}`;
        return this.http.post(url, hospital);
    }

    // http://localhost:3000/hospital/5e56cd059f693e7f7b19ca5f?token={{Token}}
    updateHospital(hospital: Hospital) {
        const url = `${BASE_URL}/hospital/${hospital._id}?token=${this.userService.token}`;
        return this.http.put(url, hospital);
    }

    // http://localhost:3000/hospital/5e56d389e657b40a887830aa?token={{Token}}
    deleteHospital(id: string) {
        const url = `${BASE_URL}/hospital/${id}?token=${this.userService.token}`;
        return this.http.delete(url);
    }
}
