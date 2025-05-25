{
    // constraints

    interface Student {
        id: number;
        name: string;
        email: string;
    }
    const addCourseToStudent = <T extends Student>(student: T) => {
        const course = 'next label web-devloper'

        return {
            ...student,  //here is add a extra proparty 
            course
        }
    }

    const student1 = addCourseToStudent({
        id: 1243,
        name: "mr. x",
        email: "x@gmail.com",
        devType: "NLWD"
    })


    const studen2 = addCourseToStudent({
        id: 3452,
        name: 'Mr. y',
        email: "Y@gmail.com",
        hasWatch: "apple watch",
        extra_skill: "Next.js"
    })

    const studen3 = addCourseToStudent({
        id: 2134,
        email: 'e@xyz.com',
        name: "New",
        level: "fressher"
    })
}