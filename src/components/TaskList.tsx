import Task from "./Task";
import {useSelector} from 'react-redux';
import {selectTasks, selectSearchQuery} from "./TaskSlice";

const TaskList = () => {
    const tasks = useSelector(selectTasks);
    const searchQuery = useSelector(selectSearchQuery);
    const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            {filteredTasks.map((task) =>
                <Task
                    key={task.id}
                    task={task}
                />
            )}
        </div>
    );
};

export default TaskList;