{
    const user: {
        readonly company: string,
        firstName: string,
        middleName?: string,
        lastName: string,
        isMaried?: boolean
    } = {
        company: 'Programming hero ',
        firstName: "Ripon",
        lastName: 'mia',

    }
    user.middleName = "rajib"

    console.log(user)
}