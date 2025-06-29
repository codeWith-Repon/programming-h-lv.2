import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./features/task/taskSlice"
import userReducer from './features/user/userSlice'
export const store = configureStore({
    reducer: {
        todo: taskReducer,
        users: userReducer,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>