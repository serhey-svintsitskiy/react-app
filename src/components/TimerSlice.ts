import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { countTotal } from "./TaskSlice";

export enum PomodoroMode {
    pomodoro = 'pomodoro',
    break = 'break',
}

interface initalStateInterface {
    pomodoroTime: number,
    breakTime: number,
    displayTime: number,
    isWorking: boolean,
    isPause: boolean,
    mode: PomodoroMode,
    workedTime: number
}

const initialState: initalStateInterface = {
    pomodoroTime: 10,
    breakTime: 5,
    displayTime: 10,
    isWorking: false,
    isPause: false,
    mode: PomodoroMode.pomodoro,
    workedTime: 0
}

export const timerSlice = createSlice({
    name: "timerSlice",
    initialState,
    reducers: {
        decrement: (state: initalStateInterface) => {
            state.displayTime -= 1;
        },
        start: (state: initalStateInterface) => {
            state.isWorking = true;
            state.isPause = false;
        },
        stop: (state: initalStateInterface) => {
            state.isWorking = false;
            state.isPause = false;
            if (state.mode === 'pomodoro') {
                state.workedTime = state.pomodoroTime - state.displayTime;
                state.mode = PomodoroMode.break;
                state.displayTime = state.breakTime;
            } else {
                state.mode = PomodoroMode.pomodoro;
                state.displayTime = state.pomodoroTime;
            }
        },
        pause: (state: initalStateInterface) => {
            state.isPause = true;
            state.isWorking = false;
        },
        startTrackingTask: (state: initalStateInterface) => {
            state.mode = PomodoroMode.pomodoro;
            state.displayTime = state.pomodoroTime;
            state.isWorking = true;
            state.isPause = false;
        },
        changeMode: (state: initalStateInterface, action: PayloadAction<PomodoroMode>) => {
            state.mode = action.payload;
        },
    }
});

export const {decrement, start, stop, pause, startTrackingTask} = timerSlice.actions;

export const selectDisplayTime = (state: any): number => state.timer.displayTime;
export const selectMode = (state: any): PomodoroMode => state.timer.mode;
export const selectIsWorking = (state: any): boolean => state.timer.isWorking;
export const selectIsPause = (state: any): boolean => state.timer.isPause;
export const selectWorkedTime = (state: any): number => state.timer.workedTime;

export const formatTime = (time: any) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
        (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
    );
}

export const stopTimer = (): any => (dispatch: any, getState: any) => {
    const currentWorkedTime = selectWorkedTime(getState());

    dispatch(countTotal(currentWorkedTime));
    dispatch(stop());
}

export default timerSlice.reducer;