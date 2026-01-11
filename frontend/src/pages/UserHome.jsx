function UserHome({ onCreateTask, onBack }) {

    return (
        <div>
            <h1>Welcome 'User'</h1>
            <h3>Current Tasks...</h3>
            <br /><br />
            <br /><br />
            <button onClick={onCreateTask}>Create Task</button>
            <br /><br />
            <button onClick={onBack}>Logout</button>
        </div>
    );
}
export default UserHome;