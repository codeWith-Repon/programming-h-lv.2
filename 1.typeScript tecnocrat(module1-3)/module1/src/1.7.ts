{
    const friend1: string[] = ['Minhajul', "Kashemi", "hasemi"]
    const friend2: string[] = ['main', 'su lin', 'kim youn']

    // console.log([...friend1, ...friend2])

    const mentors1 = {
        typescript: "Mezba",
        redux: "Mir",
        dbms: "Mizan",
    };

    const mentors2 = {
        prisma: "Firoz",
        next: "Tanmoy",
        cloud: "Nahid",
    };

    const mentor = {
        ...mentors1,
        ...mentors2
    }
    // console.log(mentor)

    const getFriend = (...friend:string[]) =>{
        console.log(...friend)
    }
    getFriend("Abul", "kabul", "babul", "ubul", "labul")

}