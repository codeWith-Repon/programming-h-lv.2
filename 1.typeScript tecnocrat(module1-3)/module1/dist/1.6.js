"use strict";
{
    const add = (num1, num2) => num1 + num2;
    console.log(add(1, 2));
    const poorUser = {
        name: "Ripon",
        balance: 0,
        addBalance(balance) {
            return `My new balance is: ${this.balance + balance}`;
        }
    };
    console.log(poorUser.addBalance(10));
    console.log(poorUser.addBalance(20));
    const arr = [1, 2, 3,];
    arr.forEach((num) => console.log(num * num));
}
