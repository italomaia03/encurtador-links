export const getLongUrlService = async (shortId?: string) => {
  const apiURL = import.meta.env.VITE_APP_API_URL;
  if (!apiURL) {
    throw new Error("API URL is not defined");
  }
  return await fetch(`${apiURL}/${shortId}`);
};
