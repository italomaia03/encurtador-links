import type { FormEventHandler, ReactNode } from "react";

type ShortnerFormProps = {
  originalUrl: string;
  setOriginalUrl: (value: string) => void;
  isLoading: boolean;
  error: ReactNode;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
}

export const ShortenerForm = ({ originalUrl, setOriginalUrl, isLoading, error, handleSubmit }: ShortnerFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="url" className="text-gray-700 font-medium">
          Insira o link que deseja encurtar:
        </label>
        <div className="flex space-x-2">
          <input
            type="url"
            id="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://exemplo.com.br"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-900 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Encurtando...' : 'Encurtar Link'}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};