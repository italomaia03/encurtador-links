import { useState } from 'react';
import { Tooltip } from './Tooltip';
import CopyIcon from './CopyIcon';

type ShortenedUrlDisplayProps = {
  shortenedUrl: string;
}

export const ShortenedUrlDisplay = ({ shortenedUrl }: ShortenedUrlDisplayProps) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <div className="mt-6">
      <p className="text-gray-700 mb-2">Seu link encurtado:</p>
      <div className="flex items-center bg-gray-200 p-3 rounded-md">
        <a
          href={shortenedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline flex-grow truncate"
        >
          {shortenedUrl}
        </a>
        <div className="relative">
          <Tooltip show={showCopied} />
          <button
            onClick={handleCopy}
            className="ml-2 p-2 text-gray-600 hover:text-gray-800 hover:cursor-pointer focus:outline-none"
            title="Copiar link"
          >
            <CopyIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};