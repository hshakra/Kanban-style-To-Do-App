import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function UserHome() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ver1/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/")}>Back to Home</button>
      <button onClick={() => navigate("/create-task")}>Create Task</button>
      <h1>Welcome User</h1>

      <h3>Current Tasks</h3>

      {loading && <p>Loading tasks...</p>}

      {!loading && tasks.length === 0 && <p>No tasks created yet.</p>}

      {!loading && tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              <br />
              {task.description}
              <br />
              Status: {task.status}
            </li>
          ))}
        </ul>
      )}

      <br />
      <br />
    </div>
  );
}
export default UserHome;
