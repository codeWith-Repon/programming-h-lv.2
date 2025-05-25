{
    const isAuthenticated = undefined;

    const result1 = isAuthenticated ?? "Guest";
    const result2 = isAuthenticated ? isAuthenticated : "Guest";
    console.log({ result1 }, { result2 });

    type User = {
        name: string;
        address: {
            city: string;
            road: string;
            presentaddress: string;
            permanentAddress?: string;
        };
    };

    const user: User = {
        name: "Persian",
        address: {
            city: "ctg",
            road: "Awesome Road",
            presentaddress: "ctg town",
        },
    };

    const permanentAddress =
        user?.address?.permanentAddress ? user.address.permanentAddress : "No Permanent Address";
    console.log({ permanentAddress });
}