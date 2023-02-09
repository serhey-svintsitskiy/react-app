import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TaskInterface {
    id: number,
    title: string,
    complete: boolean,
    totalTime: number,
}

interface initalStateInterface {
    tasks: TaskInterface[],
    searchQuery: string,
    completedTasks: TaskInterface[],
    currentTask?: TaskInterface,
}

const initialState: initalStateInterface = {
    tasks: [
        {id: 1, title: 'sleep', complete: false, totalTime: 0},
        {id: 2, title: 'play Witcher', complete: false, totalTime: 0},
        {id: 3, title: 'eat', complete: false, totalTime: 0},
        {id: 4, title: 'have more relax', complete: false, totalTime: 0},
        {id: 5, title: 'eat again', complete: false, totalTime: 0},
        {id: 6, title: 'walk out', complete: false, totalTime: 0},
        {id: 7, title: 'drink tea', complete: false, totalTime: 0},
        {id: 8, title: 'have shower', complete: false, totalTime: 0},
        {id: 9, title: 'drink green tea', complete: false, totalTime: 0},
        {id: 10, title: 'do some interesting', complete: false, totalTime: 0},
    ],
    searchQuery: '',
    completedTasks: [],
    currentTask: undefined,
}

export const taskSlice = createSlice({
        name: "taskSlice",
        initialState,
        reducers: {
            createTask: (state, action: PayloadAction<TaskInterface>) => {
                state.tasks.push(action.payload);
            },
            completeTask: (state, action: PayloadAction<TaskInterface>) => {
                state.tasks = state.tasks.map(
                    function (task) {
                        if (task.id === action.payload.id) {
                            return {...task, complete: !task.complete};
                        } else {
                            return task;
                        }
                    }
                );
                state.completedTasks.push(action.payload);
                state.tasks = state.tasks.filter(task => task.complete === false);
            },
            searchTask: (state, action) => {
                state.searchQuery = action.payload;
            },
            removeTask: (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            },
            setCurrentTask: (state, action) => {
                state.currentTask = action.payload;
            },
            countTotal: (state, action) => {
                state.tasks = state.tasks.map(
                    function (task) {
                        if (state.currentTask && task.id === state.currentTask.id) {
                            return {...task, totalTime: task.totalTime + action.payload.workedTime};
                        } else {
                            return task;
                        }
                    }
                );
            },
        }
    });

export const {createTask, searchTask, removeTask, completeTask, setCurrentTask, countTotal} = taskSlice.actions;

export const selectTasks = (state: any): TaskInterface[] => state.tasks.tasks;
export const selectSearchQuery = (state: any): string => state.tasks.searchQuery;
export const selectCurrentTask = (state: any): TaskInterface => state.tasks.currentTask;

export default taskSlice.reducer;