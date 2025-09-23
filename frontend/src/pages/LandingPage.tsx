import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
            <h1 className="text-5xl font-bold mb-4 text-cyan-400">Welcome to the SSO Demo App</h1>
            <p className="text-lg text-gray-300 mb-8">
                This application demonstrates Single Sign-On using React and FastAPI with Azure AD.
            </p>
            <button
                onClick={() => navigate('/login')}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105"
            >
                Get Started
            </button>
        </div>
    );
};

export default LandingPage;
