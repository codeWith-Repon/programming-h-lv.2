{
    // access modifiers

    class BankAccount {
        id: number;
        name: string;
        balance: number;

        constructor(id: number, name: string, balance: number) {
            this.id = id;
            this.name = name;
            this.balance = balance
        }
    }

    const poorAccount = new BankAccount(111, "Mr. Gorib", 20)
    // you can change value but I want to immutable account id and balance
    poorAccount.id = 234
}

{
    class BankAccount {
        public readonly id: number;
        public name: string;
        private _balance: number;

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
        test(){
            this.addDeposit;
            this.name;
            //balances you can not access here 
        }
    }


    const poorAccount = new BankAccount(111, "Mr. Gorib", 20)
    poorAccount.addDeposit(10)
    poorAccount.getBalance()

}

{
    class BankAccount {
        public readonly id: number;
        public name: string;
        protected _balance: number;

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