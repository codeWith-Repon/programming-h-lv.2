{

    // getter and setter

    class BankAccount {
        public readonly id: number;
        public name: string;
        protected _balance: number;

        constructor(id: number, name: string, balance: number) {
            this.id = id;
            this.name = name;
            this._balance = balance
        }
        // addDeposit(amount: number) {
        //     this._balance += amount
        // }

        set addDeposit (amount: number){
            this._balance += amount
        }

        // getBalance() {
        //     console.log(`Your Balance is ${this._balance}`)
        // }

        //getter 
        get balance() {
            return this._balance
        }
    }

    // advantage of getter functon : We can call a function like proparty(poorAccount.Balance)
    const poorAccount = new BankAccount(111, "Mr. Gorib", 20)
    // poorAccount.addDeposit(10)
    // poorAccount.getBalance()

    poorAccount.addDeposit = 50
    const myBalance = poorAccount.balance
    console.log(myBalance)

}