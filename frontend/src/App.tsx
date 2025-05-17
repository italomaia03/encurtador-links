import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RedirectPage } from "./components/RedirectPage";
import { ShortenerPage } from "./components/ShortenerPage";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ErrorPage } from "./components/ErrorPage";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/:shortId" element={<RedirectPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
