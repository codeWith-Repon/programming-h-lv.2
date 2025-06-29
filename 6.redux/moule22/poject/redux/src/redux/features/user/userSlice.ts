import type { RootState } from "@/redux/store";
import type { IUser } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    user: IUser[];
}

const initialState: InitialState = {
    user: [
        {
            id: 'asdfweasdf3142',
            name: "Repon",
            email: "demo@gmail.com",
            isLoggedIn: true
        },
        {
            id: 'fdsa534dsa3142',
            name: "mamun",
            email: "doctor@gmail.com",
            isLoggedIn: true
        },

    ],
}

export type DraftUser = Pick<IUser, "name" | "email">;

const createUser = (userData: DraftUser): IUser => {
    return { id: nanoid(), isLoggedIn: true, ...userData }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<DraftUser>) => {
            const userData = createUser(action.payload)
            state.user.push(userData)
        },
        removeUser: (state, action) => {
            state.user = state.user.filter((user) => user.id != action.payload)
        }
    }
})

export const selectUser = (state: RootState) => {
    return state.users.user
}

export const { addUser, removeUser } = userSlice.actions
export default userSlice.reducer