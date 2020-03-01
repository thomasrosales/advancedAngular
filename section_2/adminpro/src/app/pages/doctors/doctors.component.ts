import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.models';
import { DoctorsService } from '../../services/doctor/doctors.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrls: []
})
export class DoctorsComponent implements OnInit {
    doctors: Doctor[] = [];
    totalDoctors: number = 0;

    constructor(private doctorsService: DoctorsService) {}

    ngOnInit(): void {
        this.loadDoctors();
    }

    loadDoctors() {
        this.doctorsService.loadDoctors().subscribe(response => {
            this.doctors = response;
            this.totalDoctors = this.doctorsService.totalDoctors;
        });
    }

    findDoctor(filter: string) {
        if (!filter || filter === '') {
            return;
        }
        this.doctorsService.findDoctor(filter).subscribe(response => {
            this.doctors = response;
        });
    }

    create() {}

    deleteDoctor(doctor: Doctor) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.value) {
                this.doctorsService
                    .deleteDoctor(doctor._id)
                    .subscribe(response => {
                        this.loadDoctors();
                    });
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
        });
    }
}
