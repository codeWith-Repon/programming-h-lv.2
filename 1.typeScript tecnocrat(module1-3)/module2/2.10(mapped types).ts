{
    // mapped type

    const arrOfNumber: number[] = [1, 2, 3]

    // const arrOfStrings : string[] = ['1','4','5']

    const arrOfStrings: string[] = arrOfNumber.map((number) => number.toString())
    console.log(arrOfStrings)

    type AreaNumber = {
        height: number;
        width: number;
    }

    type Height = AreaNumber["height"] //look up type

    // type AreaString = {
    //   height: string;
    //   width: string
    // }

    type AreaString = {
        [key in keyof AreaNumber]: string
    }

    const area: AreaString = {
        height: '10',
        width: '20'
    }

    // implement generic type

    // const area1: { height: string; width: number } = {
    //     height: '10',
    //     width: 20
    // }

    // T => {height:string;width:number}
    //keyof T = height | width

    type AreaString1<T> = {
        [key in keyof T]: T[key]
    }

    const area1: AreaString1<{ height: string, width: number }> = {
        height: '100',
        width: 12
    }

}