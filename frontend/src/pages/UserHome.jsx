import { useEffect, useState } from "react";
function UserHome({ onCreateTask, onBack }) {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/ver1/tasks")
            .then(res => res.json())
            .then(data => setTasks(data))
            .finally(() => setLoading(false));
    }, []);


    return (
    <div>
        <h1>Welcome User</h1>

        <h3>Current Tasks</h3>

        {loading && <p>Loading tasks...</p>}

        {!loading && tasks.length === 0 && (
            <p>No tasks created yet.</p>
        )}

        {!loading && tasks.length > 0 && (
            <ul>
                {tasks.map(task => (
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

        <br /><br />

        <button onClick={onCreateTask}>Create Task</button>
        <br /><br />
        <button onClick={onBack}>Logout</button>
    </div>
);

}
export default UserHome;