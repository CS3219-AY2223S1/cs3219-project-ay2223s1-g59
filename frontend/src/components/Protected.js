const Protected = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return (
            <h1 className="m-5 text-center">401 Page <a href="./login">Go back to login page</a></h1>
        )
    }
    return children;
};

export default Protected;