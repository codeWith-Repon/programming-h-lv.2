{
    //

    //type assertion

    let anything: any
    anything = "next level web devlopment";

    (anything as string).length  /// new you can use string method

    anything = 123;
    (anything as number).toFixed /// new you can use numnber method

    const kgToGm = (value: string | number): string | number | undefined => {
        if (typeof value === "string") {
            const convertedValue = parseFloat(value) * 1000;
            return `The converted value is : ${convertedValue}`;
        }
        if (typeof value === "number") {
            return value * 1000;
        }
    };

    const result1 = kgToGm(1000) as number;
    const result2 = kgToGm("1000") as string;
    // console.log(result1)

    type CustomError = {
        message: string;
    };

    try {
    } catch (error) {
        console.log((error as CustomError).message);
    }


}