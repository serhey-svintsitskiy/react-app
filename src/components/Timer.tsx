import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    decrement,
    formatTime,
    pause,
    selectDisplayTime,
    selectIsPause,
    selectIsWorking,
    selectMode,
    start,
    stopTimer,
    PomodoroMode
} from "./TimerSlice";
import { selectCurrentTask } from "./TaskSlice";
import Button from 'react-bootstrap/Button';


export const Timer = () => {
    const displayTime = useSelector(selectDisplayTime);
    const mode = useSelector(selectMode);
    const isWorking = useSelector(selectIsWorking);
    const isPausing = useSelector(selectIsPause);
    const currentTask = useSelector(selectCurrentTask);
    const dispatch = useDispatch();

    useEffect(
        () => {
            let timer = setInterval(decTime, 1000);
            function decTime() {
                if (isWorking) {
                    if (displayTime >= 1) {
                        dispatch(decrement());
                    } else {
                        dispatch(stopTimer());
                        clearInterval(timer);
                    }
                }
            }
            return () => clearInterval(timer);
        },
        [dispatch, displayTime, isWorking]
    );


    return (
        <div className="row justify-content-center box-content-wrapper">
            <div className="timer-content container-sm">
                <div className="container p-3 work-mode">
                    <h3>Status Timer: {mode}</h3>
                    {currentTask ? <h3>Current task: {currentTask.title}</h3> : ''}
                    <h2 className="display-1"><span className="fw-bolder">{formatTime(displayTime)}</span></h2>
                    {!isPausing
                        ? <Button onClick={() => {
                                !isWorking ? dispatch(start())
                                    : mode === PomodoroMode.pomodoro ? dispatch(pause()) : dispatch(stopTimer())
                            }}>
                                {!isWorking ? "Start" : mode === PomodoroMode.pomodoro ? "Pause" : "Skip brake"}
                            </Button>
                        : <div>
                            <Button onClick={() => dispatch(start())}>Continue</Button>
                            <Button onClick={() => dispatch(stopTimer())}>Stop</Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Timer;