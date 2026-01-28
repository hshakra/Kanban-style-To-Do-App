import { useNavigate } from "react-router-dom";

function CreateUser({ onUserHome }) {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      username: e.target.username.value,
      password: e.target.password.value,
      role: "USER",
    };

    console.log("Submitting user:", user);

    try {
      // Simulated backend POST
      const response = await fetch("/api/ver1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      console.log("Response status:", response.status);

      onUserHome();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  }

  return (
    <div>
      <button onClick={() => navigate("/user-home")}>Go to User Home</button>
      <button onClick={() => navigate("/home")}>Back to Home</button>
      <form id="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="someone123@example.com"
          required
        />
        <br />

        <label>Password</label>
        <textarea
          type="password"
          name="password"
          placeholder="*********"
        ></textarea>
        <br />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default CreateUser;
