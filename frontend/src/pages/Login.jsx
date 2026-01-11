
function Login({ onBack, onUserHome }) {
    return (
        <div>
            <h1>TaskLane</h1>
            <h3>Username</h3>
            <textarea placeholder="someone@123"></textarea>
            <h3>Password</h3>
            <textarea placeholder="************"></textarea>
            <br /><br />
            <button onClick={onUserHome}>Login</button>
            <br /><br />
            <button onClick={onBack}>Back</button>
        </div>
    );
}

export default Login;
