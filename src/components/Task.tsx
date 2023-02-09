import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { removeTask, completeTask, setCurrentTask } from "./TaskSlice";
import { startTrackingTask } from "./TimerSlice";
import Button from 'react-bootstrap/Button';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import CloseButton from 'react-bootstrap/CloseButton';


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
        <div ref={ref} className="task p-2" style={{backgroundColor: !inView ? 'red' : 'white'}}>
            <div 
                className="gap-3"
                style={{
                display: 'flex',
                flexFlow: 'row',
                alignContent: 'flex-start',
            }}>
                <FormCheckInput
                    type="checkbox"
                    checked={task.complete}
                    onChange={() => dispatch(completeTask(task))}
                />
                <Button onClick={() => trackTask(task)}>Play</Button>
                <div style={{
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
                <CloseButton
                    onClick={() => dispatch(removeTask(task))}
                ></CloseButton>
            </div>
        </div>
    );
};

export default Task;