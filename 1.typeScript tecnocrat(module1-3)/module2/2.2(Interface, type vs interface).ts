{
    //interface

    type User1 = {
        name: string,
        age: number
    }

    type rollNumber = number


    interface User2 {
        name: string,
        age: number
    }

    const user1: User1 = {
        name: "Jadu",
        age: 100
    }
    const user2: User2 = {
        name: "Jadu",
        age: 100
    }

    type UserWithRole1 = User1 & { role: string }

    const userWithRole1: UserWithRole1 = {
        name: "Jadu",
        age: 100,
        role: "123"
    }

    interface UserWithRole2 extends User2 {
        role: string
    }

    //type extends to interface

    // interface UserWithRole2 extends User1 {
    //     role: string
    // }

    const userWithRole2: UserWithRole2 = {
        name: "Jadu",
        age: 100,
        role: "123"
    }

    //js --> object, arry -> object function -> object

    type roll1 = number[];

    interface roll2 {
        [index: number]: number
    }

    const rollNumber1: roll1 = [1, 2, 3]
    const rollNumber2: roll2 = [1, 2, 3]

    type Add1 = (num1: number, num2: number) => number
    interface Add2 {
        (num1: number, num2: number): number
    }

    const add1: Add1 = (num1, num2) => num1 + num2
    const add2: Add2 = (num1, num2) => num1 + num2

}