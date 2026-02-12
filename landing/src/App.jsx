import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Chatbot from './components/Chatbot.jsx';
import Landing from './pages/Landing.jsx';
import Demo from './pages/Demo.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
