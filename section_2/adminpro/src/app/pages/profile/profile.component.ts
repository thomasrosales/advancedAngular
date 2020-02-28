import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UserService, UploadFileService } from '../../services/settings.index';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: []
})
export class ProfileComponent implements OnInit {
    user: User;
    fileData: File = null;

    constructor(
        private userService: UserService,
        private uploadFile: UploadFileService
    ) {
        this.user = userService.user;
    }

    ngOnInit(): void {}

    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
    }

    save(newUser: any) {
        if (!this.user.google) {
            this.user.nombre = newUser.username;
            this.user.email = newUser.useremail;
            this.userService.updateUser(this.user).subscribe(
                response => {
                    console.log('ok');
                },
                error => {
                    console.log(error);
                }
            );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Your work has not been saved',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    uploadImage() {
        console.log('OK');
        this.uploadFile
            .uploadFile(this.fileData, 'users', this.user._id)
            .subscribe((response: any) => {
                this.user.image = response.user.image;
                this.userService.updateUser(this.user).subscribe();
            });
    }
}
