{

    // Task 1:
    const welcomeMessage: string = "Hello World, I will complete this course successfully and become a Next level Web Developer! "

    // console.log(welcomeMessage)

    // Task 2:

    type Person = {
        name: string,
        age: number,
        role?: 'admin' | 'user' | 'guest'
    }

    const personInput = (person: Person) => {
        console.log(`name: ${person.name}, age: ${person.age}, role: ${person.role}`)
    }

    // personInput({name:'Ripon', age:21, role:"admin"})


    // alternative with generaic type
    const personWithGeneric = <T>(person: T): T => {
        return person
    }

    // console.log(personWithGeneric({ name: 'Ripon', age: 21, role: "admin" }))






    {
        // tasek 3

        type Person = {
            Name: string;
            Address: string;
            Hair: string;
            EyeColor: string;
            Income: number;
            Expense: number;
            Hobbies: string[];
            FamilyMembers: number;
            Job: string;
            Skills: string[];
            MaritalStatus: "marid" | "unmarid";
            Friends: string[];
        }
    }

    //task 4

    interface Book {
        title: string;
        auther: string;
    }
    interface Magazine {
        title: string;
        publisher: string;
    }

    type bookMetarial = Book | Magazine
    type magazineMetarial = Book & Magazine


    // task 5
    function reverseString(str: string): string {
        let text = ''
        for (let i = str.length - 1; i >= 0; i--) {
            text += str[i]
        }
        return text;
    }

    console.log(reverseString("hello"))

    // alternative 
    const reverseString1 = (str: string): string => str.split("").reverse().join("");
    // console.log(reverseString1('repon'))

    // task 6
    const getSum = (rest: number[]) => {
        // return rest.reduce((acc: number, item: number) => acc + item, 0)

        let sum = 0
        for (const num of rest) {
            sum += num
        }
        return sum
    }

    //    console.log(getSum([1, 2, 3, 4]))

    //task 7
    const handleInput = (input: number | string): string => {
        if ((typeof input) == 'number') {
            return `squire of number ${input * input}`
        } else {
            return `String length is ${input.length}`
        }
    }
    // console.log(handleInput(4))
    // console.log(handleInput("Repon"))

    {
        // task 8
        // type User = {
        //     name: string;
        //     email: string
        // }
        interface User {
            name: string;
            email: string;
        }
        // type Admin = User & {
        //     adminLevel: string
        // }

        interface Admin extends User {
            adminLevel: string
        }

        const descripbeAdmin = (user: Admin): void => {
            const { name, email, adminLevel }: Admin = user

            console.log(`Admin name is; ${name}, \nadmin email is: ${email}, \nadminLevel is: ${adminLevel}`)
        }

        // descripbeAdmin({ name: 'REpon', email: "yz@.com", adminLevel: 'LV2' })
    }

    //task 9
    interface Employee {
        name: string;
        contact: {
            email: string;
            phone: string;
        }
        address: {
            city: string;
            country: string
        }
    }

    function getEmployeeCity(employe: Employee) {
        console.log(employe?.address?.city)
    }
    const employe: Employee = {
        name: 'Repon',
        contact: {
            email: 'r@gmal.com',
            phone: '13298'
        },
        address: {
            city: "californiya",
            country: 'usa'
        }
    }
    // getEmployeeCity(employe)

    function getDisplayName(name?: string | null | undefined): string {
        if (name) {
            return `name is ${name}`
        }
        return name ?? "Anonymonus"
    }

    // console.log(getDisplayName())

    // task 11;
    function processData(data?: unknown) {
        if (typeof data == 'string') {
            console.log(data.toUpperCase())
        } else if (typeof data == 'number') {
            console.log(data * data)
        } else {
            console.log('give me a data to process some operation')
        }
    }
    // processData('repon')

    //task 12
    function handleError(message: string): never {
        throw new Error(message)
    }
    // handleError('lkjsdlksad')

    //task 13: 
    interface RemoveDuplicate<T> {
        removeDuplicate(items: T[]): T[]
    }
    // const removeDuplicateValue: RemoveDuplicate<any> = {
    //     removeDuplicate<T>(items: T[]): T[] {
    //         return [...new Set(items)]
    //     }
    // }

    const removeDuplicateValue: RemoveDuplicate<any> = {
        removeDuplicate<T>(items: T[]): T[] {
            const uniqueItems: T[] = []

            for (const item of items) {
                if (!uniqueItems.includes(item)) {
                    uniqueItems.push(item)
                }
            }
            return uniqueItems
        }
    }


    // console.log(removeDuplicateValue.removeDuplicate([1, 2, 2, 3, 4, 4, 5]));
    // console.log(removeDuplicateValue.removeDuplicate(["apple", "banana", "apple"]));
}
