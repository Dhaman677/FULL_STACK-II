import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../redux/slices/taskSlice";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <h4 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title}
      </h4>
      <button onClick={() => dispatch(toggleTask(task.id))}>
        Toggle
      </button>
      <button onClick={() => dispatch(deleteTask(task.id))}>
        Delete
      </button>
    </div>
  );
};

export default TaskCard;