
function Home({ onLogin }) {

    return (
        <div>
            <h1>TaskLane</h1>

            <button onClick={onLogin}>
                Login
            </button>
        </div>
    );
}

export default Home;
