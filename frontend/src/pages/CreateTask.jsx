function CreateTask({ onUserHome }) {

  async function handleSubmit(e) {
    e.preventDefault();

    // Gather form data
    const task = {
      title: e.target.title.value,
      description: e.target.description.value,
      priority: e.target.priority.value,
      status: "OPEN",
    };

    console.log("Submitting task:", task);

    try {
      // Simulated backend POST
      const response = await fetch("/api/ver1/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      // Optional: log fake response
      console.log("Response status:", response.status);

      // Navigate back to userHome
      onUserHome();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  }

  return (
    <div>
      <form id="new-task-form" onSubmit={handleSubmit}>
        <h2>New Task</h2>

        <label>Task Title</label>
        <input type="text" name="title" placeholder="Task title" required />
        <br />

        <label>Task Description</label>
        <textarea name="description" placeholder="Task description"></textarea>
        <br />

        <label>Task Priority</label>
        <select name="priority">
          <option value="low">LOW</option>
          <option value="medium">MEDIUM</option>
          <option value="high">HIGH</option>
        </select>
        <br />

        <button type="submit">Create Task</button>
      </form>

      <br />

      <button type="button" onClick={onUserHome}>Back</button>
    </div>
  );
}

export default CreateTask;

