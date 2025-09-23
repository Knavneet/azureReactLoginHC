const LoginPage = () => {

    const handleLogin = () => {
        // The magic happens here!
        // We redirect the user to our backend's login endpoint.
        // The backend will then redirect to Azure AD.
        window.location.href = 'http://localhost:8000/login';
    };

    return (
        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full">
             <h2 className="text-3xl font-bold mb-6 text-cyan-400">Login with Azure AD</h2>
             <p className="text-gray-400 mb-8">Click the button below to sign in with your Microsoft account.</p>
             <button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 flex items-center justify-center"
            >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.016c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm-1 3.984h2v8h-2v-8zm1 12a1 1 0 110-2 1 1 0 010 2zM3.924 11h2.016c.05-1.56.49-3.02 1.21-4.33L5.43 5.43c-1.07 1.48-1.74 3.28-1.506 5.57zM11 3.924v2.016c1.56.05 3.02.49 4.33 1.21l1.24-1.72c-1.48-1.07-3.28-1.74-5.57-1.506zM18.076 13h-2.016c-.05 1.56-.49 3.02-1.21 4.33l1.72 1.24c1.07-1.48 1.74-3.28 1.506-5.57zM13 20.076v-2.016c-1.56-.05-3.02-.49-4.33-1.21l-1.24 1.72c1.48 1.07 3.28 1.74 5.57 1.506z"/></svg>
                Sign in with Microsoft
            </button>
        </div>
    );
};

export default LoginPage;
