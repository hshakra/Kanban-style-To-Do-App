import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CreateTask.css";

function CreateTask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const task = {
      title: title,
      description: description,
      priority: priority,
      status: "OPEN",
    };

    try {
      const response = await fetch("http://localhost:8080/api/ver1/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        navigate("/user-home");
      } else {
        setError("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-task-page">
      <div className="create-task-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
      </div>

      <div className="create-task-container">
        <button className="back-button" onClick={() => navigate("/user-home")}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Dashboard
        </button>

        <div className="create-task-card">
          <div className="task-header">
            <div className="task-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Create New Task</h1>
            <p>Add a new task to your workflow</p>
          </div>

          <form onSubmit={handleSubmit} className="task-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="title">
                Task Title <span className="required">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details about this task..."
                rows={5}
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">
                Priority <span className="required">*</span>
              </label>
              <div className="priority-options">
                <button
                  type="button"
                  className={`priority-button high ${priority === "HIGH" ? "active" : ""}`}
                  onClick={() => setPriority("HIGH")}
                >
                  <span className="priority-dot high"></span>
                  High Priority
                </button>
                <button
                  type="button"
                  className={`priority-button medium ${priority === "MEDIUM" ? "active" : ""}`}
                  onClick={() => setPriority("MEDIUM")}
                >
                  <span className="priority-dot medium"></span>
                  Medium Priority
                </button>
                <button
                  type="button"
                  className={`priority-button low ${priority === "LOW" ? "active" : ""}`}
                  onClick={() => setPriority("LOW")}
                >
                  <span className="priority-dot low"></span>
                  Low Priority
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => navigate("/user-home")}
              >
                Cancel
              </button>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M16.5 6.5L7.5 15.5L3.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Create Task</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
