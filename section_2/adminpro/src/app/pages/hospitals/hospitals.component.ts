import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.models';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-hospitals',
    templateUrl: './hospitals.component.html',
    styles: []
})
export class HospitalsComponent implements OnInit {
    hospitals: Hospital[] = [];
    from: number = 0;
    totalHospital: number = 0;
    loadingFlag: boolean = false;

    constructor(
        private hospitalService: HospitalService,
        private modalUploadService: ModalUploadService
    ) {}

    ngOnInit(): void {
        this.loadHospitals();
        // SUBSCRIBIER A CUALUQIER NOTIFICACION DEL EVENT EMMITER
        this.modalUploadService.notification.subscribe(response => {
            this.loadHospitals();
        });
    }

    loadHospitals(offset?: number) {
        this.loadingFlag = true;
        if (!offset) {
            offset = this.from;
        }
        this.hospitalService.loadHospitals(offset).subscribe(response => {
            this.totalHospital = response['total'];
            this.hospitals = response['hospital'];
        });
        this.loadingFlag = false;
    }

    findHospital(filter: string) {
        this.loadingFlag = true;
        if (filter === '') {
            filter = 'a';
        }
        this.hospitalService.findHospital(filter).subscribe(response => {
            this.hospitals = response['hospitals'];
            //this.totalUsers = this.users.length;
        });
        this.loadingFlag = false;
    }

    deleteHospital(hospital: Hospital) {
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
                this.hospitalService
                    .deleteHospital(hospital._id)
                    .subscribe(response => {
                        this.loadHospitals();
                    });
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
        });
    }

    saveHospital(hospital: Hospital) {
        this.loadingFlag = true;
        this.hospitalService.updateHospital(hospital).subscribe(response => {
            Swal.fire('Updated!', 'Your file has been updated.', 'success');
        });
        this.loadingFlag = false;
    }

    displayModal(hospital: Hospital) {
        this.modalUploadService.displayModal(
            'hospitals',
            hospital._id,
            hospital.image
        );
    }

    create() {
        Swal.fire({
            title: 'Create Hospital',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            showLoaderOnConfirm: true,
            preConfirm: name => {
                if (!name) {
                    Swal.showValidationMessage(`Name Required !`);
                    return;
                }
                return name;
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then(result => {
            if (result.value) {
                this.hospitalService
                    .createHospital(result.value)
                    .subscribe(response => {
                        this.loadHospitals();
                        Swal.fire(
                            'Created!',
                            'Your file has been created.',
                            'success'
                        );
                    });
            }
        });
    }
}
