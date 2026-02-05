import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/UserHome.css";

function UserHome() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    // No auth check - anyone can access
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:8080/api/ver1/tasks");
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("userEmail");
    navigate("/");
  }

  function handleDragStart(task) {
    setDraggedTask(task);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  async function handleDrop(newStatus) {
    if (!draggedTask || draggedTask.taskStatus === newStatus) {
      setDraggedTask(null);
      return;
    }

    // Optimistically update UI
    const updatedTasks = tasks.map((task) =>
      task.id === draggedTask.id ? { ...task, taskStatus: newStatus } : task
    );
    setTasks(updatedTasks);
    setDraggedTask(null);

    // In a real app, you'd update the backend here
    // For now, we'll just keep the UI updated
  }

  const openTasks = tasks.filter((task) => task.status === "OPEN");
  const doneTasks = tasks.filter((task) => task.status === "DONE");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "var(--accent-danger)";
      case "MEDIUM":
        return "var(--accent-warning)";
      case "LOW":
        return "var(--accent-success)";
      default:
        return "var(--text-secondary)";
    }
  };

  return (
    <div className="user-home">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-small">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M9 11L12 14L22 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1>TaskFlow</h1>
        </div>

        <div className="header-right">
          <button
            className="header-button create"
            onClick={() => navigate("/create-task")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 4V16M4 10H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            New Task
          </button>
          <button className="header-button logout" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M13 16L18 11M18 11L13 6M18 11H6M6 16H3.5C2.67157 16 2 15.3284 2 14.5V5.5C2 4.67157 2.67157 4 3.5 4H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Kanban Board */}
      <main className="kanban-board">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner-large"></div>
            <p>Loading your tasks...</p>
          </div>
        ) : (
          <>
            {/* Open Column */}
            <div
              className="kanban-column"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop("OPEN")}
            >
              <div className="column-header">
                <div className="column-title">
                  <div className="column-icon open">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle
                        cx="10"
                        cy="10"
                        r="7"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <h2>Open</h2>
                  <span className="task-count">{openTasks.length}</span>
                </div>
              </div>

              <div className="tasks-container">
                {openTasks.length === 0 ? (
                  <div className="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>No open tasks</p>
                  </div>
                ) : (
                  openTasks.map((task) => (
                    <div
                      key={task.id}
                      className="task-card"
                      draggable
                      onDragStart={() => handleDragStart(task)}
                    >
                      <div className="task-card-header">
                        <h3>{task.title}</h3>
                        <span
                          className="priority-badge"
                          style={{
                            backgroundColor:
                              getPriorityColor(task.priority) + "20",
                            color: getPriorityColor(task.priority),
                          }}
                        >
                          {task.taskPriority}
                        </span>
                      </div>
                      {task.taskDescription && (
                        <p className="task-description">
                          {task.taskDescription}
                        </p>
                      )}
                      <div className="task-footer">
                        <span className="task-id">#{task.id.slice(0, 8)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Done Column */}
            <div
              className="kanban-column done"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop("DONE")}
            >
              <div className="column-header">
                <div className="column-title">
                  <div className="column-icon done">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.5 6.5L7.5 15.5L3.5 11.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h2>Done</h2>
                  <span className="task-count">{doneTasks.length}</span>
                </div>
              </div>

              <div className="tasks-container">
                {doneTasks.length === 0 ? (
                  <div className="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 11L12 14L22 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>No completed tasks</p>
                  </div>
                ) : (
                  doneTasks.map((task) => (
                    <div
                      key={task.id}
                      className="task-card completed"
                      draggable
                      onDragStart={() => handleDragStart(task)}
                    >
                      <div className="task-card-header">
                        <h3>{task.title}</h3>
                        <span
                          className="priority-badge"
                          style={{
                            backgroundColor:
                              getPriorityColor(task.taskPriority) + "20",
                            color: getPriorityColor(task.taskPriority),
                          }}
                        >
                          {task.taskPriority}
                        </span>
                      </div>
                      {task.description && (
                        <p className="task-description">{task.description}</p>
                      )}
                      <div className="task-footer">
                        <span className="task-id">#{task.id.slice(0, 8)}</span>
                        <span className="done-badge">✓ Completed</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default UserHome;
