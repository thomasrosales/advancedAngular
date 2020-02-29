import { User } from './user.models';
import { Hospital } from './hospital.models';

export class Doctor {
    constructor(
        public nombre: string,
        public image: string,
        public user: User,
        public hospital: Hospital,
        public _id?: string
    ) {}
}
