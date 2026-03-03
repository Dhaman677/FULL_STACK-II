import { useSelector } from "react-redux";
import { useMemo } from "react";

const Analytics = () => {
  const tasks = useSelector((state) => state.tasks?.tasks ?? []);

  const completedCount = useMemo(() => {
    return tasks.filter(task => task.completed).length;
  }, [tasks]);

  const pendingCount = useMemo(() => {
    return tasks.filter(task => !task.completed).length;
  }, [tasks]);

  const completionRate = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((completedCount / tasks.length) * 100);
  }, [completedCount, tasks.length]);

  return (
    <div className="page">
      <h1>Analytics Dashboard</h1>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>

        <div className="analytics-card">
          <h3>Completed</h3>
          <p>{completedCount}</p>
        </div>

        <div className="analytics-card">
          <h3>Pending</h3>
          <p>{pendingCount}</p>
        </div>

        <div className="analytics-card">
          <h3>Completion Rate</h3>
          <p>{completionRate}%</p>
        </div>
      </div>

      <div className="analytics-message">
        {completionRate === 100 && tasks.length > 0 && (
          <p>🎉 All tasks completed! Great job!</p>
        )}
        {completionRate > 0 && completionRate < 100 && (
          <p>🚀 Keep going! You're making progress.</p>
        )}
        {tasks.length === 0 && (
          <p>📌 No tasks added yet. Go to Reports and add some tasks.</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;