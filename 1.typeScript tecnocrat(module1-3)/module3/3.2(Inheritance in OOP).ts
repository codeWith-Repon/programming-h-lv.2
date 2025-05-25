{


    class Student {
        // name: string;
        // age: number;
        // address: string;

        // constructor(name: string, age: number, address: string) {
        //     this.name = name;
        //     this.age = age;
        //     this.address = address;
        // }
        constructor(public name: string, public age: number, public address: string) {

        }
        getSlep(numOfHours: number) {
            console.log(`${this.name} will sleep ${numOfHours} hours`)
        }
    }

    const student1 = new Student("Mr. student", 20, "Uganda")
    // student1.getSlep(8)
}

{
    class Teacher {
        constructor(public name: string, public age: number, public address: string, public designation: string) {

        }
        getSlep(numOfHours: number) {
            console.log(`${this.name} will sleep ${numOfHours} hours`)
        }
        takeClass(numOfHours: number) {
            console.log(`${this.name} will take class ${numOfHours} hour`)
        }
    }

    const teacher1 = new Teacher('Mr. Teacher', 40, "Usa", "Proffesor")
    // teacher1.takeClass(5)

}

{
    class Person {

        // name: string;
        // age: number;
        // address: string;

        // constructor(name: string, age: number, address: string) {
        //     this.name = name;
        //     this.age = age;
        //     this.address = address;
        // }

        //same as 
        constructor(public name: string, public age: number, public address: string) { }


        getSlep(numOfHours: number) {
            console.log(`${this.name} will sleep for ${numOfHours}`)
        }
    }

    class Student extends Person {
        constructor(name: string, age: number, address: string) {
            super(name, age, address)
        }
    }

    class Teacher extends Person {
        constructor(name: string, age: number, address: string, public designation: string) {
            super(name, age, address)

        }
        takeClass(numOfHours: number) {
            console.log(`${this.name} will take class ${numOfHours} hour`)
        }
    }
    const student1 = new Student("Mr. student", 20, "Uganda")
    const teacher1 = new Teacher('Mr. Teacher', 40, "Usa", "Proffesor")
    teacher1.takeClass(5)

}