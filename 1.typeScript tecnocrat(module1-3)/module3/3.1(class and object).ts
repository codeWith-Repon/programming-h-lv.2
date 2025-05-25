{
    //oop- classs

    class Animal {
        // name: string;
        // species: string;
        // sound: string     /// you want to write like this

        public name: string;
        public species: string;
        public sound: string

        constructor(name: string, species: string, sound: string) {
            this.name = name;
            this.species = species;
            this.sound = sound
        }

        makeSound() {
            console.log(`The ${this.name} says ${this.sound}`)
        }
    }

    const dog = new Animal("German Shapared Bhai", 'dog', "Barking")

    dog.makeSound()

}

{
    //you also write like this 

    class Animal {

        constructor(public name: string, public species: string, public sound: string) {

        }
        makeSound() {
            console.log(`The ${this.name} says ${this.sound}`)
        }
    }
    const cat = new Animal("Pussy Bhai", 'dog', "mew mew")
    cat.makeSound()
}