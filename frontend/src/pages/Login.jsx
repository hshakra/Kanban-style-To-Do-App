import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefaultt();

    //getting the login credentials
    const user = {
      username: e.target.username.value,
      password: e.target.password.value,
      role: "USER",
    };

    try {
      // Simulated backend POST
      const response = await fetch("/api/ver1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
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
        <input type="password" name="pswd"></input>
        <br />

        <button type="submit">Login</button>
      </form>
      <button
        onClick={() => {
          console.log("button cliked");
          navigate("/home");
        }}
      >
        Home
      </button>
    </div>
  );
}

export default Login;
