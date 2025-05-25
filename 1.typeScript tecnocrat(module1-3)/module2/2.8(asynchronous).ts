{
    //Promise

    type Todo = {
        id: number;
        userId: number;
        title: string;
        completed: boolean;
    }

    const getTodo = async (): Promise<Todo> => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')

        const data: Todo = await response.json()
        console.log(data)
        return data
    }
    getTodo()


    type Something = {
        something: string
    }

    const createPromise = (): Promise<Something> => {
        return new Promise<Something>((resolve, reject) => {
            const data = { something: "something" }

            if (data) {
                resolve(data)
            } else {
                reject("failed to load data")
            }
        })
    }

    const showData = async (): Promise<Something> => {
        const data: Something = await createPromise();

        console.log(data)
        return data
    }

    showData()

}