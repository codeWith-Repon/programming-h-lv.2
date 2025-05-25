{
    // utility types
    // Pick

    type Person = {
        name: string;
        age: number;
        email?: string;
        contactNo: string
    }

    type NameAge = Pick<Person, "name" | "age">

    //Omit
    type ContactInfo = Omit<Person, "name" | "age">

    // Required
    type PersonRequired = Required<Person>

    //Partial
    type PersonPartial = Partial<Person>

    //ReadOnly
    type PersonReadonly = Readonly<Person>
    const person1: PersonReadonly = {
        name: 'Mr. XY',
        age: 200,
        contactNo: "017"
    }

    // person1.name = "Mr. YZ" // it's thow a error

    //Record 
    // type MyObj ={
    //     a: string,
    //     b:string
    // }

    type MyObj = Record<string, string>  /// for object first one is key. That's aloways string and value string or another type.  

    const obj1: MyObj = {
        a: 'aa',
        b: 'bb',
        c: 'cc',
        d: 'dd'
    }

    type MyObj1 = Record<string, unknown>

    const EmptyObj: MyObj1 = {
        re: 'iorew'
    }

}