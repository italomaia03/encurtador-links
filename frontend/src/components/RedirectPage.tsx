import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";
import { getLongUrlService } from "../services/getLongUrlService";

export const RedirectPage = () => {
  const [error, setError] = useState("");
  const { shortId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        const data = await getLongUrlService(shortId);
        const { longUrl } = await data.json();
        window.location.href = longUrl;
      } catch (err) {
        if (err instanceof Error) {
          setError("Ocorreu um erro inesperado");
          navigate("/error", { state: { message: err.message } });
        }
      }
    };
    redirectToOriginalUrl();
  }, [navigate, shortId]);

  if (error) {
    return (
      <div className="flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <LoadingSpinner />
      </div>
    </div>
  );
};
