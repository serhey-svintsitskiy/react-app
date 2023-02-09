import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const Tasks = () => {
    return (
        <div className="taskBlock">
            <TaskForm/>
            <TaskList/>
            <div style={{margin: '5px', border: "5px solid red"}}>IS THIS BLOCK SHOWING?</div>
        </div>
    );
};

export default Tasks;