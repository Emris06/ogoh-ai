import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const links = [
    { label: 'Bosh sahifa', to: '/', hash: '' },
    { label: 'Muammo', to: '/', hash: 'muammo' },
    { label: 'Yechim', to: '/', hash: 'yechim' },
    { label: 'Qanday ishlaydi', to: '/', hash: 'qanday-ishlaydi' },
    { label: 'Jamoa', to: '/', hash: 'jamoa' },
    { label: 'Nega aynan biz', to: '/', hash: 'nega-biz' },
    { label: 'Yutuqlarimiz', to: '/', hash: 'yutuqlarimiz' },
    { label: "Yo'l xaritasi", to: '/', hash: 'roadmap' },
    { label: 'Demo', to: '/demo', hash: '' },
  ];

  const handleClick = (e, link) => {
    e.preventDefault();
    setOpen(false);

    if (link.hash) {
      if (pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(link.hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(link.hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (link.to === '/') {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else {
      navigate(link.to);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-xl border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
              </defs>
              <path d="M32 4L54 14V30Q54 48 32 60Q10 48 10 30V14Z" stroke="url(#ng)" strokeWidth="3" fill="none" />
              <path d="M32 10L48 18V30Q48 44 32 54Q16 44 16 30V18Z" stroke="url(#ng)" strokeWidth="2" fill="none" />
              <path d="M20 24H30M34 24H44" stroke="url(#ng)" strokeWidth="2" strokeLinecap="round" />
              <path d="M22 32H28M36 32H42" stroke="url(#ng)" strokeWidth="2" strokeLinecap="round" />
              <path d="M26 20V28M38 20V28" stroke="url(#ng)" strokeWidth="2" strokeLinecap="round" />
              <path d="M32 26V34" stroke="url(#ng)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="32" cy="34" r="2" fill="#06b6d4" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">ogoh<span className="text-cyan-400">.ai</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a
              key={l.label}
              href={l.hash ? `/#${l.hash}` : l.to}
              onClick={(e) => handleClick(e, l)}
              className={`text-sm transition-colors ${pathname === l.to && !l.hash ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-brand-border bg-brand-dark/95 backdrop-blur-xl px-4 py-3 space-y-2">
          {links.map(l => (
            <a
              key={l.label}
              href={l.hash ? `/#${l.hash}` : l.to}
              onClick={(e) => handleClick(e, l)}
              className="block py-2 text-sm text-gray-400 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
