{
    class BankAccount {
        public readonly id: number;
        public name: string;
        protected _balance: number; //// when use protected and private it's encasulated. because it's not accessible other place 

        constructor(id: number, name: string, balance: number) {
            this.id = id;
            this.name = name;
            this._balance = balance
        }
        addDeposit(amount: number) {
            this._balance += amount
        }
        getBalance() {
            console.log(`Your Balance is ${this._balance}`)
        }
    }

    class StudentAccount extends BankAccount {
        test() {
            this.getBalance,
                this.name,
                this.addDeposit,
                this._balance // balance: now you can access here 

        }
    }
    const poorAccount = new BankAccount(111, "Mr. Gorib", 20)
    poorAccount.addDeposit(10)
    poorAccount.getBalance()
}