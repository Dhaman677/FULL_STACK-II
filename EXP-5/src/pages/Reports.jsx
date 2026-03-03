import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../redux/slices/taskSlice";
import { useState, useMemo, useContext } from "react";
import { AppContext } from "../context/AppContext";
import TaskCard from "../components/TaskCard";

const Reports = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const { theme } = useContext(AppContext);

  const [title, setTitle] = useState("");

  const completedCount = useMemo(() => {
    return tasks.filter(task => task.completed).length;
  }, [tasks]);

  const pendingCount = useMemo(() => {
    return tasks.filter(task => !task.completed).length;
  }, [tasks]);

  const handleAdd = () => {
    if (!title) return;
    dispatch(addTask({
      id: Date.now(),
      title,
      completed: false
    }));
    setTitle("");
  };

  return (
    <div className={`page ${theme}`}>
      <h1>Reports Dashboard</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={handleAdd}>Add Task</button>

      <h3>Summary</h3>
      <p>Total: {tasks.length}</p>
      <p>Completed: {completedCount}</p>
      <p>Pending: {pendingCount}</p>

      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Reports;