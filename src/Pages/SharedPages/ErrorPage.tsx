// src/Pages/SharedPages/ErrorPage.tsx
import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { Home, AlertCircle } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();
  
  let errorStatus = 500;
  let errorTitle = "Oops! Something went wrong";
  let errorMessage = "An unexpected error has occurred.";

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorTitle = error.statusText || "Error";
    errorMessage = error.data?.message || error.statusText || "An error occurred";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-red-600 mb-2">{errorStatus}</h1>
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">{errorTitle}</h2>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          {errorMessage}
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="w-full bg-[#009689] hover:bg-[#007a6e] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Refresh Page
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default ErrorPage;