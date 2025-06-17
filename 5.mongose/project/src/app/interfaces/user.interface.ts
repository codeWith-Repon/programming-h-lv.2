export interface IAddress {
    city: string,
    street: string,
    zip: number
}

export interface IUser {
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    password: string,
    role: 'USER' | 'ADMIN' | 'SUPERADMIN',
    address: IAddress
}

export interface userInstanceMethods{
    hashPassword(password: string): string
}