{
  // generic constraint with keyof oparator
  type Vehicel = {
    bike: string;
    car: string;
    ship: string;
  };

  type Owner = 'bike' | 'car' | 'ship';
  type Owner2 = keyof Vehicel;

  // const bike:Owner2 = ''

  const getPropartyValue = <X,Y extends keyof X>(obj: X, key:Y ) =>{
    return obj[key]
  }

  const user = {
    name: 'mr. Jhon',
    age: 30,
    address: 'ctg',
  };

  const car = {
    model: 'Toyota',
    year: 29,
  };

  //obj[key] its return a value

  const result1 = getPropartyValue(car, 'model')
}
