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
    if (!draggedTask || draggedTask.status === newStatus) {
      // Changed taskStatus to status
      setDraggedTask(null);
      return;
    }

    // Store the old status for rollback if needed
    const oldStatus = draggedTask.status;

    // Optimistically update UI
    const updatedTasks = tasks.map(
      (task) =>
        task.id === draggedTask.id ? { ...task, status: newStatus } : task // Changed taskStatus to status
    );
    setTasks(updatedTasks);

    try {
      // Udate backend
      const response = await fetch(`/api/ver1/tasks/${draggedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: draggedTask.id,
          title: draggedTask.title,
          taskDescription: draggedTask.description,
          taskPriority: draggedTask.priority,
          taskStat: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);

      // Rollback on error - restore old status
      const rolledBackTasks = tasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status: oldStatus } : task
      );
      setTasks(rolledBackTasks);

      alert("Failed to update task status");
    } finally {
      setDraggedTask(null);
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      const response = await fetch(`/api/ver1/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Delete response status:", response.status);
      console.log("Delete response:", await response.text());

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else {
        alert("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task: " + error.message);
    }
  };

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
                          {task.priority}
                        </span>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteTask(task.id)}
                          aria-label="Delete task"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M3 6H5H21"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      {task.description && (
                        <p className="task-description">{task.description}</p>
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
