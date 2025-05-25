{
    //conditional type

    type a1 = number;
    type b1 = string;

    type x = a1 extends null ? true : false
    type y = a1 extends null ? true : b1 extends undefined ? undefined : any

    type sheikh = {
        bike: string,
        car: string,
        ship: string,
        plane: string
    };

    // type chekVehicle<T> = T extends 'bike' | 'car' | 'ship' | 'plane' ? true : false
    type chekVehicle<T> = T extends keyof sheikh ? true : false

    type HasPlane = chekVehicle<"plane">

} 