import {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {createTask, searchTask} from "./TaskSlice";

const TaskForm = () => {

    const dispatch = useDispatch();
    const {searchQuery} = useSelector((state: any) => state.tasks);

    const [task, setTask] = useState({title: ''})

    const createNewTask = (e: any) => {
        e.preventDefault();
        const newTask = {...task, id: Date.now(), complete: false, totalTime: 0};
        dispatch(createTask(newTask));
        setTask({title: ''})
    }

    return (
        <form className="taskForm">
            <div className="create-task">
                <input
                    type="text"
                    value={task.title}
                    onChange={e => setTask({...task, title: e.target.value})}
                    placeholder="enter task name"
                />
                <button onClick={createNewTask}>Create task</button>
            </div>
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => dispatch(searchTask(e.target.value))}
                    placeholder="search task..."
                />
            </div>
        </form>
    );
}

export default TaskForm;