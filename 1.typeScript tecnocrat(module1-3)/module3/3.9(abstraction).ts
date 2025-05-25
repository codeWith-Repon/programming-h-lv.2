{
    //abstraction: 1. interface 2. abstract

    // interface Vehicle1 {
    //     name: string;
    //     model: number
    // }

    // const vehicle1:Vehicle1 ={
    //     name: 'Toyota',
    //     model: 2000
    // }

    interface Vehicle1 {
        startEngine(): void;
        stopEngine(): void;
        move(): void;
    }

    class Car1 implements Vehicle1 {
        startEngine(): void {
            console.log(`I am starting the car engine`);
        }
        stopEngine(): void {
            console.log("I am stopping the car engine");
        }
        move(): void {
            console.log(`I am moving the car`);
        }
        test() {
            console.log(`I am just testing`);
        }
    }

    const toyotaCar = new Car1();
    toyotaCar.stopEngine();

    // abstract class

    abstract class Car2 {
        abstract startEngine(): void;
        abstract stopEngine(): void;
        abstract move(): void;
        test() {
            console.log(`I am just testing`);
        }
    }

    class ToyotaCar extends Car2 {
        startEngine(): void {
            console.log("I am starting the car  engine");
        }
        stopEngine(): void {
            console.log("I am stopping the car engine");
        }
        move(): void {
            console.log("I am moving  the car");
        }
        test(): void {
            console.log(`Iam come from decend`)
        }
    }

    const hondaCar = new ToyotaCar()
    hondaCar.test()
    hondaCar.move()
}