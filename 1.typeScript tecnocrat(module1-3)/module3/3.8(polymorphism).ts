{
    // polymorphisom

    class Person {
        getSleep() {
            console.log(`I am sleeping 8 hourse per day`)
        }
    }

    class Student extends Person {
        getSleep() {
            console.log(`I am sleeping 7 hourse per day`)
        }
    }
    class Devloper extends Person {
        getSleep() {
            console.log(`I am sleeping 6 hourse per day`)
        }
    }

    const getSleepingHours = (param: Person) => {
        param.getSleep()
    }

    const person1 = new Person()
    const person3 = new Student()
    const person2 = new Devloper()

    getSleepingHours(person1)
    getSleepingHours(person2)
    getSleepingHours(person3)

    class Shape {
        getArea(): number {
            return 0
        }
    }

    class Circle extends Shape {
        radius: number;

        constructor(radius: number) {
            super()
            this.radius = radius
        }
        getArea(): number {
            return parseFloat((Math.PI * this.radius * this.radius).toFixed(2))
        }
    }

    class Ractangle extends Shape {
        height: number;
        width: number;

        constructor(height: number, width: number) {
            super()
            this.height = height
            this.width = width
        }
        getArea(): number {
            return this.height * this.width
        }
    }

    const getArea = (param: Shape) => {
        let area = param.getArea()
        console.log(`Area is: ${area}`)
    }


    const shape2 = new Ractangle(10, 20)
    const shape3 = new Circle(10)

    getArea(shape2)
    getArea(shape3)

}