import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFileService } from 'src/app/services/settings.index';

@Injectable({
    providedIn: 'root'
})
export class ModalUploadService {
    collection: string;
    id: string;
    hide: string = 'hide-modal';
    urlImage: string;
    notification = new EventEmitter<any>();

    constructor(private uploadFile: UploadFileService) {}

    hideModal() {
        this.hide = 'hide-modal';
        this.id = null;
        this.collection = null;
        this.urlImage = null;
    }

    displayModal(collection: string, id: string, urlImage: string) {
        this.hide = '';
        this.id = id;
        this.collection = collection;
        this.urlImage = urlImage;
    }

    uploadImage({
        file,
        collection,
        id
    }: {
        file: File;
        collection: string;
        id: string;
    }) {
        return this.uploadFile.uploadFile(file, collection, id);
    }
}
