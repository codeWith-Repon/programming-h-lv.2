{
    //type guards

    //typeof --> type gurd

    type Alphanumeric = string | number;

    const add = (param1: Alphanumeric, param2: Alphanumeric): Alphanumeric => {
        if (typeof param1 === 'number' && typeof param2 === 'number') {
            return param1 + param2
        } else {
            return param1.toString() + param2.toString()
        }
    }
    const result1 = add("2", "3")
    console.log(result1)

    //in guard
    type NormalUser = {
        name: string
    }

    type AdminUser = {
        name: string;
        role: 'admin'
    }

    const getUser = (user: NormalUser | AdminUser) => {
        if ('role' in user) {
            console.log(`name is: ${user.name}. \n\troll is: ${user.role} user`)
        } else {
            console.log(`name is: ${user.name}. \n\troll is: normal user`)
        }
    }

    const normalUser: NormalUser = {
        name: "Mr. Normal Bhai",
    };
    const adminUser: AdminUser = {
        name: "Mr. Admin Bhai",
        role: "admin",
    };

    getUser(normalUser);
}