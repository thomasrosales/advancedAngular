import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.models';
import { Doctor } from '../../models/doctor.models';
import {
    DoctorsService,
    HospitalService
} from 'src/app/services/settings.index';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: []
})
export class DoctorComponent implements OnInit {
    hospitals: Hospital[] = [];
    doctor: Doctor = new Doctor('', '', '');
    hospital: Hospital;

    constructor(
        private hospitalService: HospitalService,
        private doctorService: DoctorsService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private modalUploadService: ModalUploadService
    ) {
        activatedRoute.params.subscribe(params => {
            let id = params.id;

            if (id !== 'new') {
                this.findDoctorById(id);
            }
        });
    }

    ngOnInit(): void {
        this.hospitalService.loadHospitals().subscribe((response: any) => {
            this.hospitals = response.hospital;
        });

        this.modalUploadService.notification.subscribe(response => {
            this.doctor.image = response.doctor.image;
        });
    }

    findDoctorById(id: string) {
        this.doctorService.findDoctorById(id).subscribe((response: any) => {
            let newDoctor = new Doctor(
                response.nombre,
                response.user._id,
                response.hospital._id,
                response.image,
                response._id
            );
            this.doctor = newDoctor;
            this.hospital = response.hospital;
        });
    }

    saveDoctor(doctorForm: NgForm) {
        if (doctorForm.valid) {
            this.doctorService.createDoctor(this.doctor).subscribe(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.doctor._id = response._id;
                this.router.navigate(['/doctor', response._id]);
                return;
            });
        } else {
            Swal.fire(
                'Error!',
                'Your can not be created, emty values !.',
                'error'
            );
            return;
        }
    }

    changeHospital(id: string) {
        if (id !== '') {
            this.hospitalService.getHospital(id).subscribe((response: any) => {
                this.hospital = response.hospital;
            });
        }
        return;
    }

    changeImage() {
        this.modalUploadService.displayModal(
            'doctors',
            this.doctor._id,
            this.doctor.image
        );
    }
}
