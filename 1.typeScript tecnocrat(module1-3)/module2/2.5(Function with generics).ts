{

    //function with generic 

    const createArray = (param: string): string[] => {
        return [param]
    }

    const createArrayWithGeneric = <T>(param: T): T[] => {
        return [param]
    }

    const res1 = createArray("bangladesh")
    const resGeneric = createArrayWithGeneric<string>('bangladesh')

    type User = { id: number, name: string }
    const resObjGeneric = createArrayWithGeneric<User>({
        id: 1324,
        name: "rajib"
    })

    const resArrayWithTupple = <T, Q>(params1: T, params2: Q): [T, Q] => {
        return [params1, params2]
    }

    const res10 = resArrayWithTupple<string, number>("bangladesh", 123)
    const res11 = resArrayWithTupple<string, { id: number, name: string }>("bangladehs", { id: 13298, name: "Repon" })

    const addCourseToStudent = <T>(student: T) => {
        const course = 'next label web-devloper'

        return {
            ...student,  //here is add a extra proparty 
            course
        }
    }

    const student1 = addCourseToStudent({
        name: "mr. x",
        email: "x@gmail.com",
        devType: "NLWD"
    })

    const studen2 = addCourseToStudent({
        name: 'Mr. y',
        email: "Y@gmail.com",
        hasWatch: "apple watch",
        extra_skill: "Next.js"
    })
}