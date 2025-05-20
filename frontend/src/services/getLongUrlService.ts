import { InternalServerError } from "../errors/internal-server.error";
import { NotFoundError } from "../errors/not-found.error";

export const getLongUrlService = async (shortId?: string) => {
  const apiURL = import.meta.env.VITE_APP_API_URL;
  if (!apiURL) {
    throw new Error("API URL is not defined");
  }
  const data = await fetch(`${apiURL}/${shortId}`);
  if (!data.ok) {
    throw new NotFoundError("A URL não foi encontrada");
  }

  const { longUrl } = await data.json();

  if (!longUrl) {
    throw new InternalServerError("Ocorreu um erro inesperado");
  }

  return longUrl;
};
