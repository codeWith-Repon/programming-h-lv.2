
{
    type  AddFunction = (num1:number, num2:number) => number
    
    const add: AddFunction =(num1, num2) => num1 + num2

    console.log(add(1,2))

    const poorUser = {
        name: "Ripon",
        balance: 0,
        addBalance(balance:number):string{
            return `My new balance is: ${balance}`
        }
    }

    console.log(poorUser.addBalance(10))
    console.log(poorUser.addBalance(20))

    const arr:number[] = [1,2,3,]
    arr.forEach((num:number) => console.log(num*num))
}