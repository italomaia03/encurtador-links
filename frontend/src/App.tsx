import { useState, type FormEvent } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ShortenerForm } from './components/ShortnerForm';
import { ShortenedUrlDisplay } from './components/ShortnedUrlDisplay';
import "./App.css";


export default function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!originalUrl) {
      setError('Por favor, insira um URL válido');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const randomString = Math.random().toString(36).substring(2, 8);
      setShortenedUrl(`https://encurtador.com/${randomString}`);
    } catch (err) {
      setError('Ocorreu um erro ao encurtar o link. Tente novamente.');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="flex-grow flex items-center justify-center p-4 bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <ShortenerForm
            originalUrl={originalUrl}
            setOriginalUrl={setOriginalUrl}
            isLoading={isLoading}
            error={error}
            handleSubmit={handleSubmit}
          />
          {shortenedUrl && <ShortenedUrlDisplay shortenedUrl={shortenedUrl} />}
        </div>
      </main>

      <Footer />
    </>
  );
}