import { useLocation } from "react-router-dom";

export const ErrorPage = () => {
  const location = useLocation();
  const errorState = location.state || {};

  const errorCode = errorState.errorCode || "404";
  const errorMessage = errorState.errorMessage || "Página não encontrada";

  return (
    <div className="bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-blue-200 mb-4 error-shake">
          {errorCode}
        </h1>
        <p className="text-xl text-gray-700 mb-6">{errorMessage}</p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Voltar
        </button>
      </div>
    </div>
  );
};
