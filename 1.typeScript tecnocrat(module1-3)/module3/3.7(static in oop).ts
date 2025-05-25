{

    class Counter {
        count: number = 0;
        increment() {
            return this.count += 1
        }
        decrement() {
            return this.count -= 1
        }
    }

    // this method alocate different different memory
    // so these return a different value

    const instance1 = new Counter();
    instance1.increment()
    instance1.increment()
    instance1.increment()
    // console.log(instance1.increment())

    const instance2 = new Counter()
    instance2.increment()
    // console.log(instance2.increment())
}

{
    ////static
    class Counter {
        static count: number = 0;
        increment() {
            return Counter.count += 1
        }
        decrement() {
            return Counter.count -= 1
        }
    }

    // this method alocate same memory
    // so these return a same value 

    const instance1 = new Counter();
    instance1.increment()
    instance1.increment()
    instance1.increment()
    // console.log(instance1.increment())

    const instance2 = new Counter()
    instance2.increment()
    // console.log(instance2.increment())
}
{
    class Counter {
        static count: number = 0;
        increment() {
            return Counter.count += 1
        }
        decrement() {
            return Counter.count -= 1
        }
    }

    // this method alocate same memory
    // so these return a same value 

    const instance1 = new Counter();
    instance1.increment()
    instance1.increment()
    instance1.increment()
    // console.log(instance1.increment())

    const instance2 = new Counter()
    instance2.increment()
    // console.log(instance2.increment())
}
{

    class Counter {
        static count: number = 0;
        static increment() {
            return Counter.count += 1
        }
        static decrement() {
            return Counter.count -= 1
        }
    }

    // this method alocate same memory
    // so these return a same value 

    // const instance1 = new Counter();
    // instance1.increment()
    // instance1.increment()
    // instance1.increment()
    console.log(Counter.increment())

    const instance2 = new Counter()
    // instance2.increment()
    console.log(Counter.increment())
}