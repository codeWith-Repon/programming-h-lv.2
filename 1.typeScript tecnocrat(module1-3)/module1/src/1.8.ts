const user = {
    id: 345,
    name: {
        firstName: "Mezbaul",
        middleName: "Abedin",
        lastName: "Persian",
    },
    contactNo: "0170000000",
    address: "Uganda",
};

const {name:{firstName : nick_name}} = user

console.log(nick_name)


const myFriends = ["chandler", "joey", "ross", "rachel", "monica", "phoebe"];

const [,,bestfriend, ...rest] = myFriends

console.log(rest)