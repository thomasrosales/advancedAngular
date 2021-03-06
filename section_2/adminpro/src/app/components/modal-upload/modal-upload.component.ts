import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';

@Component({
    selector: 'app-modal-upload',
    templateUrl: './modal-upload.component.html',
    styles: []
})
export class ModalUploadComponent implements OnInit {
    fileData: File = null;

    constructor(private modalUploadService: ModalUploadService) {}

    ngOnInit(): void {
        console.log('hola');
    }

    getModalDisplay(): string {
        return this.modalUploadService.hide;
    }

    getModalImage(): string {
        return this.modalUploadService.urlImage;
    }

    getCollection() {
        return this.modalUploadService.collection || '';
    }

    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
    }

    uploadImage() {
        if (!this.fileData) {
            Swal.fire({
                icon: 'error',
                title: 'Your work has not been saved',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        this.modalUploadService
            .uploadImage({
                file: this.fileData,
                collection: this.modalUploadService.collection,
                id: this.modalUploadService.id
            })
            .subscribe(
                (response: any) => {
                    this.modalUploadService.notification.emit(response);
                    this.modalUploadService.hideModal();
                },
                error => {
                    console.log('error');
                }
            );
    }

    hideModal() {
        this.modalUploadService.hideModal();
        this.fileData = null;
    }
}
