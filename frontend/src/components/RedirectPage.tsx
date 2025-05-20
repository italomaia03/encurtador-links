import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";
import { getLongUrlService } from "../services/getLongUrlService";

export const RedirectPage = () => {
  const { shortId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        const longUrl = await getLongUrlService(shortId);
        window.location.href = longUrl;
      } catch (err) {
        if (err instanceof Error) {
          navigate("/error", { state: { message: err.message } });
        }
      }
    };
    redirectToOriginalUrl();
  }, [navigate, shortId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <LoadingSpinner />
      </div>
    </div>
  );
};
