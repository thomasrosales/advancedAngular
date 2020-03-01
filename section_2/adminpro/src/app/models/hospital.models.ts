import { User } from './user.models';
export class Hospital {
    constructor(
        public nombre: string,
        public image: string,
        public user: User,
        public _id?: string
    ) {}
}
