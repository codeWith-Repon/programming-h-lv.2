// Task 13: Generics with Functions and Interfaces
// Objective: Use generics to handle different types.

// Instructions:

// Create a generic function that:
// Accepts an array of any type.
// Returns a new array with duplicate values removed.

interface RemoveDuplicate<T> {
    removeDuplicateValue(itmes: T[]): T[]
}

const removingProcess = <T>(): RemoveDuplicate<T> => ({
    removeDuplicateValue(items: T[]): T[] {
        const uniqueValue: T[] = [];

        for (const item of items) {
            if (!uniqueValue.includes(item)) {
                uniqueValue.push(item)
            }
        }
        return uniqueValue
    }
})

// const rmovingNumber = removingProcess<number>()
// const rmovingString = removingProcess<string>()
// console.log(rmovingString.removeDuplicateValue(["apple", "banana", "apple"]))

// You're defining a factory function that creates and returns an object.

// This is useful when:

// You want to generate different versions based on generic types.

// You want a function that returns a custom instance of something.

// ✅ Use this when you want reusability with different types via a generic function.

// solution 2
{
    // object literal method
    interface RemoveDuplicate<T> {
        removeDuplicateValue(itmes: T[]): T[]
    }

    const removeDuplicate: RemoveDuplicate<any> = {
        removeDuplicateValue<T>(items: T[]): T[] {
            return [...new Set(items)]
        }
    }
    // console.log(removeDuplicate.removeDuplicateValue([1, 1, 1, 2, 3, 4, 5, 6, 6, 6]))
    // console.log(removeDuplicate.removeDuplicateValue(["apple", "banana", "apple"]))

}

// This is a plain object literal that has a method.

// The method is defined inline in the object.

// You're not inside a function—you’re just assigning an object with a generic method.

// ✅ Use this when you want to immediately define and use an object with a method.

{
    interface RemoveDuplicate<T> {
        removeDuplicateValue(itmes: T[]): T[]
    }

    const createRemoveDuplicate = <T>(): RemoveDuplicate<T> => ({
        removeDuplicateValue(itmes: T[]): T[] {
            return [...new Set(itmes)]
        }
    })

    const stringDeduper = createRemoveDuplicate<string>();
    // console.log(stringDeduper.removeDuplicateValue(['a', 'b', 'a']))
}

// best solutoins

{
    interface RemoveDuplicate<T> {
        removeDuplicateValue(items: T[]): T[];
        removeDuplicateValueAdvanced(items: T[], comparator?: (a: T, b: T) => boolean): T[]
    }

    class DuplicateRemover<T> implements RemoveDuplicate<T> {
        // Basic version using Set (works for primitives)
        removeDuplicateValue(items: T[]): T[] {
            return [...new Set(items)];
        }

        // Advanced version with custom comparator
        removeDuplicateValueAdvanced(
            items: T[],
            comparator: (a: T, b: T) => boolean = (a, b) => a === b
        ): T[] {
            return items.filter((item, index, self) =>
                index === self.findIndex((t) => comparator(t, item))
            );
        }
    }
    const numberRemover = new DuplicateRemover<number>();
    // console.log(numberRemover.removeDuplicateValue([1, 2, 2, 3]));

    const objectRemover = new DuplicateRemover<{ id: number }>();
    const objects = [{ id: 1 }, { id: 1 }, { id: 2 }];

    console.log(
        objectRemover.removeDuplicateValueAdvanced(
            objects,
            (a, b) => a.id === b.id
        )
    )
}
