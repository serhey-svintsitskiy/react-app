import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { removeTask, completeTask, setCurrentTask } from "./TaskSlice";
import { startTrackingTask } from "./TimerSlice";

const Task = ({task}: any) => {
    const dispatch = useDispatch();
    const trackTask = (task: any) => {
        dispatch(startTrackingTask());
        dispatch(setCurrentTask(task));
    }   

    const {ref, inView} = useInView({
        threshold: 1
    });

    return (
        <div ref={ref} className="task" style={{backgroundColor: !inView ? 'red' : 'white'}}>
            <div style={{
                padding: '10px',
                display: 'flex',
                flexFlow: 'row',
                alignContent: 'flex-start',
            }}>
                <input
                    type="checkbox"
                    checked={task.complete}
                    onChange={() => dispatch(completeTask(task))}
                />
                <button onClick={() => trackTask(task)}>Play</button>
                <div style={{
                    margin: '20px',
                    display: 'flex',
                    flexFlow: 'row wrap',
                    alignContent: 'center',
                }}>
                    <strong>{task.title}</strong>
                </div>
            </div>
            <div style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: "center",
            }}>
                <div style={{margin: '5px'}}>
                    <strong>{task.totalTime} hour</strong>
                </div>
                <button style={{marginRight: 'auto'}} onClick={() => dispatch(removeTask(task))}>X</button>
            </div>
        </div>
    );
};

export default Task;