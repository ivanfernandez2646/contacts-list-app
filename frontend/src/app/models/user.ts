export interface User {
    _id?: string;
    username: string;
    passwordHash: string | null;
    contactsIds: string[];
}
