import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Extract the 'name' query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get('name');

    if (!userName) {
        // A simple protection mechanism. In a real app, this would be more robust.
        return (
            <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
                <h1 className="text-4xl font-bold mb-4 text-red-500">Access Denied</h1>
                <p className="text-lg text-gray-300 mb-8">
                    No user information found. Please log in first.
                </p>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition duration-300"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
            <h1 className="text-5xl font-bold mb-4 text-cyan-400">
                Hello, {userName}!
            </h1>
            <p className="text-xl text-gray-300">
                You have successfully signed in with Azure AD.
            </p>
        </div>
    );
};

export default Dashboard;
