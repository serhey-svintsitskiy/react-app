import {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {createTask, searchTask} from "./TaskSlice";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
        <div className="timer-content container-sm">
            <div className="row justify-content-center">
                <div className="col-12">
                    <Form className="taskForm">
                        <Form.Group className="row mb-3 create-task" controlId="formBasicEmail">
                            <Form.Label>Create new task</Form.Label>
                            <Form.Control
                                type="text"
                                value={task.title}
                                onChange={e => setTask({...task, title: e.target.value})}
                                placeholder="Enter task name"
                                className="mb-2"
                            />
                            <Button
                                onClick={createNewTask}
                            >
                                Create task
                            </Button>
                        </Form.Group>

                        <Form.Group className="row mb-3" controlId="formSearch">
                            <Form.Control
                                type="text"
                                value={searchQuery}
                                onChange={(e) => dispatch(searchTask(e.target.value))}
                                placeholder="search task..."
                            />
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;