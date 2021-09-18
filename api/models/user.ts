export default class User {
    constructor(
        public username: string,
        public password: string,
        public name: string,
        public surname: string,
        public phoneNumber: string,
        public driver: boolean,
        public id?: string,
    ){}
}