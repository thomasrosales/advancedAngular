import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {
    constructor(private http: HttpClient) {}

    // http://localhost:3000/upload/users/5e56ae865ec4eb57a34a65b3
    uploadFile(file: File, collection: string, id: string) {
        const url = `${BASE_URL}/upload/${collection}/${id}`;
        let formData = new FormData();
        formData.append('image', file, file.name);
        return this.http.put(url, formData);
    }
}
