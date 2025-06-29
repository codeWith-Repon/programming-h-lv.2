import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    tasks: ITask[];
    filter: "all" | "high" | "medium" | "low"
}
export type Priority = "all" | "low" | "medium" | "high"

const initialState: InitialState = {
    tasks: [
        {
            id: "98erekjlasfd",
            title: "Inintial frontend",
            description: "Create Home page, and routing",
            dueDate: "2025-11",
            isCompleted: false,
            priority: "high"
        },
    ],
    filter: "all"
}

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">

const createTask = (taskData: DraftTask): ITask => {
    return { id: nanoid(), isCompleted: false, ...taskData }
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<DraftTask>) => {
            // const id = uuidv4();
            // const taskData = {
            //     ...action.payload,
            //     id,
            //     isCompleted: false
            // };
            const taskData = createTask(action.payload)
            state.tasks.push(taskData)
        },
        toggleCompleteState: (state, action: PayloadAction<string>) => {
            state.tasks.forEach(task =>
                task.id === action.payload ?
                    task.isCompleted = !task.isCompleted : task)
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id != action.payload)
        },
        updateTask: (state, action: PayloadAction<ITask>) => {
            const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id)
            state.tasks[taskIndex] = action.payload
        },
        updateFilter: (state, action: PayloadAction<Priority>) => {
            state.filter = action.payload
        }
    }
})

export const selectTasks = (state: RootState) => {
    const filter = state.todo.filter
    if (filter === "low") {
        return state.todo.tasks.filter((task) => task.priority === "low")
    } else if (filter === "medium") {
        return state.todo.tasks.filter((task) => task.priority === "medium")
    }
    else if (filter === "high") {
        return state.todo.tasks.filter((task) => task.priority === "high")

    } else {
        return state.todo.tasks
    }
}

export const { addTask, toggleCompleteState, deleteTask, updateTask, updateFilter } = taskSlice.actions

export default taskSlice.reducer