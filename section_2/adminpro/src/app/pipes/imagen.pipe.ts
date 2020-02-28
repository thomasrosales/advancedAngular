import { Pipe, PipeTransform } from '@angular/core';
import { BASE_URL } from '../config/config';

@Pipe({
    name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
    transform(image: string, collection: string = 'users'): any {
        if (!image) {
            image = 'xxx';
        }

        if (image.indexOf('https') >= 0) {
            return image;
        }

        switch (collection) {
            case 'users':
                collection = 'users';
                break;
            case 'doctors':
                collection = 'doctors';
                break;
            case 'hospitals':
                collection = 'hospitals';
                break;
            default:
                collection = 'users';
                break;
        }

        let url = `${BASE_URL}/image/${collection}/${image}`;

        return url;

        //http://localhost:3000/image/users/5e56ae865ec4eb57a34a65b3-325.jpeg
    }
}
