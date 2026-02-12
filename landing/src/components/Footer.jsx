import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-brand-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">ogoh<span className="text-cyan-400">.ai</span></span>
          <span className="text-xs text-gray-600">v1.0 — Hackathon Build</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-white transition-colors">Bosh sahifa</Link>
          <Link to="/demo" className="hover:text-white transition-colors">Demo</Link>
          <a href="#jamoa" className="hover:text-white transition-colors">Jamoa</a>
        </div>
        <p className="text-xs text-gray-600 flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          Zero data retention
        </p>
      </div>
    </footer>
  );
}
