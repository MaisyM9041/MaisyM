import React, { useState, useEffect, useRef } from 'react';
import { Home, Users, BookOpen, Award, Bell, Play, X, Film, Camera, Calendar } from 'lucide-react';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const FONT_SERIF = "Georgia, 'Times New Roman', serif";

const characters = [
  {
    id: 1,
    name: "Lewis Ramone",
    role: "The Class Clown",
    description: "Lewis is charismatic, unserious, and far more likeable than his report would suggest. He drifts through his classes with confidence, humour and a belief that things will sort themselves out. While he pretends not to care about failing, he is still quietly aware that coasting has limits - and being in the group might not bother him as much as he would like to claim, giving him somewhere to land without having to admit he needs it.",
    color: "#7C3AED",
    accent: "#A78BFA",
    photo: "https://placehold.co/400x500/1a1030/A78BFA?text=Lewis+Ramone&font=open-sans"
  },
  {
    id: 2,
    name: "Sophie Gee",
    role: "The Overachiever",
    description: "With her clear plans, colour-coded notes, and belief that effort leads to results, Sophie has built her entire life around her academic capabilities. She deeply believes that if you work hard enough you will be rewarded. Unfortunately, this theory is repeatedly tested by reality. Whilst others coast and cut corners, she is quietly committed to her grand ambitions and struggles more than she lets on when her grades don't reflect how hard she's trying.",
    color: "#0891B2",
    accent: "#67E8F9",
    photo: "https://placehold.co/400x500/001825/67E8F9?text=Sophie+Gee&font=open-sans"
  },
  {
    id: 3,
    name: "Hollie Clayton",
    role: "The Conspiracy Theorist",
    description: "Hollie considers herself far more informed than most people in the room. She has strong opinions about fairness, power and authority - often at length and inappropriately timed. In practice, her worldview is a mix of genuine concern, half-remembered articles, and conclusions she has very confidently reached on her own. She believes school operates on hidden systems designed to benefit the same people every time, and she's constantly trying to expose this.",
    color: "#BE185D",
    accent: "#F9A8D4",
    photo: "https://placehold.co/400x500/200010/F9A8D4?text=Hollie+Clayton&font=open-sans"
  },
  {
    id: 4,
    name: "Mrs Smith",
    role: "The Strictest Teacher in History",
    description: "To the students, she is an obstacle, a deadline, a voice administering remorseless consequences. She runs her classroom with clear expectations and very little patience for chaos. She isn't unfair - just consistent - and believes that structure is a form of care.",
    color: "#B45309",
    accent: "#FCD34D",
    photo: "https://placehold.co/400x500/1a1000/FCD34D?text=Mrs+Smith&font=open-sans"
  }
];

const episodes = [
  { number: 10, title: "The Library Lockdown", description: "The group accidentally gets locked in the library overnight and discovers the conspiracy was real all along.", color: "#1D4ED8" },
  { number: 11, title: "Cafeteria Chronicles", description: "Sophie runs for student council while Lewis becomes unexpectedly invested in how he's perceived outside the study group, leading to some questionably uncharacteristic choices.", color: "#065F46" },
  { number: 12, title: "Final Draft", description: "The season finale. The final presentation. The ultimate chaos. Everything goes wrong in the best way possible.", color: "#6D28D9", featured: true }
];

const btsClip = {
  id: 1,
  title: "Making the Finale",
  subtitle: "How we shot the chaos",
  description: "Go behind the camera for Episode 12 and see how the production team orchestrated the show's most ambitious sequence - multiple rooms, zero budget, one take.",
  youtubeId: "YOUTUBE_BTS_ID",
  duration: "8:42",
  tag: "PRODUCTION"
};

// Replace with YouTube video ID
const YOUTUBE_MAIN_ID = 'YOUTUBE_MAIN_ID';

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #080808; font-family: ${FONT}; }

    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

    /* NAV */
    .nav-tabs { display: flex; align-items: center; gap: 4px; }
    .nav-tab-label { display: inline; }

    /* HERO */
    .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1280px; margin: 0 auto; padding: 80px 24px 96px; }
    .hero-title { font-size: 66px; }

    /* STATS */
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 1280px; margin: 0 auto; }
    .stats-cell { border-top: 1px solid #111; }
    .stats-cell:not(:last-child) { border-right: 1px solid #111; }

    /* EPISODES */
    .episodes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

    /* ANNOUNCEMENTS */
    .announcements-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    /* CHARACTER GRID */
    .characters-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

    /* QUOTES GRID */
    .quotes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    /* PRODUCTION NOTES */
    .prod-notes-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }

    /* FOOTER */
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 48px; margin-bottom: 40px; }

    /* SECTION PADDING */
    .section-pad { padding: 80px 24px; }
    .section-pad-sm { padding: 60px 24px; }

    /* PAGE HEADER */
    .page-header-title { font-size: 50px; }
    .page-header-pad { padding: 80px 24px 60px; }

    /* BTS CARD LAYOUT */
    .bts-single { max-width: 720px; margin: 0 auto; padding: 64px 24px 80px; }

    /* DYSFUNCTION BOX */
    .dysfunction-box { padding: 48px; }

    @media (max-width: 768px) {
      /* NAV - show icons only on small screens, labels hidden */
      .nav-tab-label { display: none; }
      .nav-tabs { gap: 2px; }

      /* HERO - stack vertically */
      .hero-grid { grid-template-columns: 1fr; gap: 32px; padding: 48px 16px 56px; }
      .hero-title { font-size: 44px; }

      /* STATS - 2x2 grid */
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .stats-cell:nth-child(2) { border-right: none; }
      .stats-cell:nth-child(3) { border-right: 1px solid #111; }

      /* EPISODES - single column */
      .episodes-grid { grid-template-columns: 1fr; gap: 16px; }

      /* ANNOUNCEMENTS - single column */
      .announcements-grid { grid-template-columns: 1fr; }

      /* CHARACTERS - single column */
      .characters-grid { grid-template-columns: 1fr; }

      /* QUOTES - single column */
      .quotes-grid { grid-template-columns: 1fr; }

      /* PRODUCTION NOTES - single column */
      .prod-notes-grid { grid-template-columns: 1fr; gap: 12px; }

      /* FOOTER - single column */
      .footer-grid { grid-template-columns: 1fr; gap: 32px; }

      /* SECTION PADDING - tighter on mobile */
      .section-pad { padding: 48px 16px; }
      .section-pad-sm { padding: 40px 16px; }
      .page-header-pad { padding: 48px 16px 40px; }
      .page-header-title { font-size: 36px; }

      /* BTS single clip */
      .bts-single { padding: 40px 16px 56px; }

      /* DYSFUNCTION BOX */
      .dysfunction-box { padding: 28px 20px; }
    }

    @media (max-width: 480px) {
      .hero-title { font-size: 36px; }
      .page-header-title { font-size: 30px; }
    }
  `}</style>
);

// ─── YOUTUBE MODAL ────────────────────────────────────────────────────────────
const YoutubeModal = ({ videoId, title, onClose }) => {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '900px', animation: 'fadeUp 0.25s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontFamily: FONT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '12px' }}>{title}</span>
          <button onClick={onClose} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#9CA3AF', borderRadius: '6px', padding: '6px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontFamily: FONT, flexShrink: 0 }}>
            <X size={14} /> Close
          </button>
        </div>
        {/* 16:9 responsive iframe wrapper */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}>
          <iframe
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

// ─── NEWS TICKER ──────────────────────────────────────────────────────────────
const NewsTicker = () => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset(p => (p <= -900 ? 0 : p - 0.5)), 16);
    return () => clearInterval(id);
  }, []);
  const items = ["New Episode Every Thursday", "Season Finale Now Streaming", "Winner: Best Comedy Ensemble", "Behind the Scenes Exclusive", "Season 2 Confirmed"];
  return (
    <div style={{ background: '#0F0F0F', borderBottom: '1px solid #222', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{ background: '#E11D48', color: 'white', padding: '6px 12px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: FONT }}>LATEST</div>
      <div style={{ overflow: 'hidden', flex: 1, padding: '6px 0' }}>
        <div style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', transform: `translateX(${offset}px)` }}>
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <span key={i} style={{ color: '#9CA3AF', fontSize: '12px', letterSpacing: '0.04em', fontFamily: FONT }}>
              <span style={{ color: '#E11D48', marginRight: '8px' }}>-</span>{item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── STATS COUNTER ────────────────────────────────────────────────────────────
const StatsCounter = ({ end, label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let c = 0; const inc = end / 60;
        const t = setInterval(() => { c += inc; if (c >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(c)); }, 2000 / 60);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '28px 16px' }}>
      <div style={{ color: '#E11D48', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}><Icon size={22} strokeWidth={1.5} /></div>
      <div style={{ fontSize: '34px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, fontFamily: FONT }}>
        {count.toLocaleString()}{end === 95 ? '%' : end >= 1000 ? '+' : ''}
      </div>
      <div style={{ color: '#6B7280', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '8px', fontFamily: FONT }}>{label}</div>
    </div>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const Navbar = ({ currentPage, setCurrentPage }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profiles', label: 'Characters', icon: Users },
    { id: 'bts', label: 'Behind the Scenes', icon: Camera }
  ];
  return (
    <nav style={{ background: '#0A0A0A', borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, zIndex: 40, fontFamily: FONT }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }} onClick={() => setCurrentPage('home')}>
          <div style={{ width: '32px', height: '32px', background: '#E11D48', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '12px' }}>GP</span>
          </div>
          <div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>Group Project</span>
            <span style={{ color: '#4B5563', fontSize: '10px', display: 'block', letterSpacing: '0.07em', textTransform: 'uppercase' }}>A Clarendon Original</span>
          </div>
        </div>
        <div className="nav-tabs">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setCurrentPage(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px',
                borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 600,
                fontSize: '13px', fontFamily: FONT, transition: 'all 0.15s ease',
                background: currentPage === id ? '#1a1a1a' : 'transparent',
                color: currentPage === id ? 'white' : '#6B7280'
              }}>
              <Icon size={15} />
              <span className="nav-tab-label">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// ─── EPISODE CARD ─────────────────────────────────────────────────────────────
const EpisodeCard = ({ ep }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: '#111', border: `1px solid ${hovered ? '#333' : '#1a1a1a'}`, borderRadius: '12px', overflow: 'hidden', transition: 'all 0.25s ease', transform: hovered ? 'translateY(-4px)' : 'none', boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.5)' : 'none', position: 'relative' }}>
      {ep.featured && <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#E11D48', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.1em', zIndex: 2, fontFamily: FONT }}>FINALE</div>}
      <div style={{ background: ep.color, height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <span style={{ fontSize: '64px', fontWeight: 900, color: 'rgba(255,255,255,0.1)', fontFamily: FONT, letterSpacing: '-0.05em' }}>{ep.number}</span>
        <div style={{ position: 'absolute', bottom: '12px', left: '14px' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', fontFamily: FONT }}>EP. {ep.number}</span>
        </div>
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        <h4 style={{ color: 'white', fontWeight: 700, fontSize: '15px', marginBottom: '8px', fontFamily: FONT }}>{ep.title}</h4>
        <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: '1.65', fontFamily: FONT }}>{ep.description}</p>
      </div>
    </div>
  );
};

// ─── CHARACTER CARD ───────────────────────────────────────────────────────────
const CharacterCard = ({ character }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: '#0F0F0F', border: `1px solid ${hovered ? character.color + '80' : '#1a1a1a'}`, borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s ease', transform: hovered ? 'translateY(-5px)' : 'none', boxShadow: hovered ? `0 24px 70px ${character.color}1a` : 'none', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: '240px', background: character.color, overflow: 'hidden', flexShrink: 0 }}>
        {!imgError ? (
          <img src={character.photo} alt={character.name} onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '22px', fontFamily: FONT }}>{character.name.split(' ').map(w => w[0]).join('')}</span>
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(transparent, #0F0F0F)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: `1px solid ${character.color}50`, borderRadius: '100px', padding: '4px 10px' }}>
          <span style={{ color: character.accent, fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', fontFamily: FONT }}>{character.role}</span>
        </div>
      </div>
      <div style={{ padding: '18px 20px 22px' }}>
        <h3 style={{ color: 'white', fontWeight: 700, fontSize: '17px', marginBottom: '8px', fontFamily: FONT }}>{character.name}</h3>
        <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: '1.7', fontFamily: FONT }}>{character.description}</p>
      </div>
    </div>
  );
};

// ─── ANNOUNCEMENT CARD ────────────────────────────────────────────────────────
const AnnouncementCard = ({ title, date, category, description, accent }) => (
  <div style={{ background: '#0F0F0F', border: '1px solid #1a1a1a', borderLeft: `3px solid ${accent}`, borderRadius: '0 12px 12px 0', padding: '18px', fontFamily: FONT }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '8px' }}>
      <span style={{ background: `${accent}1a`, color: accent, fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{category}</span>
      <span style={{ color: '#4B5563', fontSize: '11px', whiteSpace: 'nowrap' }}>{date}</span>
    </div>
    <h4 style={{ color: 'white', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>{title}</h4>
    <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: '1.6' }}>{description}</p>
  </div>
);

// ─── BTS CARD ─────────────────────────────────────────────────────────────────
const BTSCard = ({ clip, onPlay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: '#0F0F0F', border: `1px solid ${hovered ? '#333' : '#1a1a1a'}`, borderRadius: '14px', overflow: 'hidden', transition: 'all 0.25s ease', transform: hovered ? 'translateY(-4px)' : 'none', boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.5)' : 'none' }}>
      <div onClick={() => onPlay(clip)}
        style={{ height: '200px', background: 'linear-gradient(135deg, #0d0d1a 0%, #1a0d0d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
        <Film size={56} color="rgba(255,255,255,0.04)" style={{ position: 'absolute' }} />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: hovered ? '#E11D48' : 'rgba(225,29,72,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(225,29,72,0.35)', transition: 'background 0.2s' }}>
            <Play size={20} fill="white" color="white" style={{ marginLeft: '3px' }} />
          </div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontFamily: FONT }}>{clip.duration}</span>
        </div>
        <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(0,0,0,0.6)', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '3px 10px' }}>
          <span style={{ color: '#9CA3AF', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', fontFamily: FONT }}>{clip.tag}</span>
        </div>
      </div>
      <div style={{ padding: '18px 20px 22px' }}>
        <h4 style={{ color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '4px', fontFamily: FONT }}>{clip.title}</h4>
        <p style={{ color: '#E11D48', fontSize: '12px', fontWeight: 600, letterSpacing: '0.03em', marginBottom: '10px', fontFamily: FONT }}>{clip.subtitle}</p>
        <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: '1.65', fontFamily: FONT }}>{clip.description}</p>
      </div>
    </div>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = ({ setCurrentPage }) => {
  const [modal, setModal] = useState(null);
  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: FONT }}>
      {modal && <YoutubeModal videoId={modal.videoId} title={modal.title} onClose={() => setModal(null)} />}

      {/* Hero */}
      <section style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #080808 100%)', borderBottom: '1px solid #111' }}>
        <div className="hero-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#E11D4812', border: '1px solid #E11D4835', borderRadius: '100px', padding: '5px 14px', marginBottom: '20px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E11D48', animation: 'blink 2s infinite', flexShrink: 0 }} />
              <span style={{ color: '#E11D48', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Now Streaming - Season Finale</span>
            </div>
            <h1 className="hero-title" style={{ fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '18px', fontFamily: FONT }}>Group<br />Project</h1>
            <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>A Clarendon College Original Series</p>
            <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: '1.75', maxWidth: '440px', marginBottom: '28px' }}>
              A mismatched group of students end up in the same after-school tutor group to salvage their grades. What starts as a reluctant arrangement turns into an unfolding saga of chaotic teamwork, failed schemes, and accidental bonding.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => setModal({ videoId: YOUTUBE_MAIN_ID, title: 'Episode 12 - Final Draft' })}
                style={{ display: 'flex', alignItems: 'center', gap: '9px', background: '#E11D48', color: 'white', border: 'none', borderRadius: '8px', padding: '13px 20px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'background 0.2s', fontFamily: FONT }}
                onMouseEnter={e => e.currentTarget.style.background = '#BE123C'}
                onMouseLeave={e => e.currentTarget.style.background = '#E11D48'}>
                <Play size={15} fill="white" /> Watch Finale
              </button>
              <button onClick={() => setCurrentPage('profiles')}
                style={{ display: 'flex', alignItems: 'center', gap: '9px', background: 'transparent', color: '#9CA3AF', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '13px 20px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', fontFamily: FONT }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#9CA3AF'; }}>
                <Users size={15} /> Meet the Cast
              </button>
            </div>
          </div>

          {/* Video thumbnail */}
          <div onClick={() => setModal({ videoId: YOUTUBE_MAIN_ID, title: 'Episode 12 - Final Draft' })}
            style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', position: 'relative', boxShadow: '0 30px 100px rgba(0,0,0,0.6)', border: '1px solid #1F2937', transition: 'transform 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(225,29,72,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(225,29,72,0.5)' }}>
                <Play size={22} fill="white" color="white" style={{ marginLeft: '3px' }} />
              </div>
              <div style={{ textAlign: 'center', padding: '0 16px' }}>
                <p style={{ color: 'white', fontWeight: 700, fontSize: '15px', fontFamily: FONT }}>Episode 12 - Final Draft</p>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px', marginTop: '4px', fontFamily: FONT }}>Season Finale</p>
              </div>
            </div>
            <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#E11D48', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.08em', fontFamily: FONT }}>SEASON FINALE</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: '1px solid #111' }}>
        <div className="stats-grid">
          {[
            { end: 12, label: 'Episodes Released', icon: BookOpen },
            { end: 4, label: 'Main Cast Members', icon: Users },
            { end: 2500, label: 'Viewers', icon: Award },
            { end: 95, label: 'Approval Rating', icon: Bell }
          ].map((s, i) => (
            <div key={i} className="stats-cell">
              <StatsCounter {...s} />
            </div>
          ))}
        </div>
      </section>

      {/* Finale synopsis */}
      <section className="section-pad" style={{ borderBottom: '1px solid #111' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#4B5563', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: FONT }}>Season Finale</p>
          <h3 style={{ color: 'white', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px', fontFamily: FONT }}>Episode 12: Final Draft</h3>
          <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: '1.8', fontFamily: FONT }}>Despite the intense pressure all year, the group are finally ready for the summer break with their, surprisingly polished, final project - all that's left is to submit it.</p>
        </div>
      </section>

      {/* Episodes */}
      <section className="section-pad" style={{ borderBottom: '1px solid #111' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px', gap: '16px' }}>
            <div>
              <p style={{ color: '#4B5563', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: FONT }}>Season 1</p>
              <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 800, fontFamily: FONT }}>Previous Episodes</h3>
            </div>
            <span style={{ color: '#374151', fontSize: '12px', fontFamily: FONT, whiteSpace: 'nowrap' }}>Season 2 Confirmed</span>
          </div>
          <div className="episodes-grid">
            {episodes.map(ep => <EpisodeCard key={ep.number} ep={ep} />)}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="section-pad">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ color: '#4B5563', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', fontFamily: FONT }}>Updates</p>
          <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 800, marginBottom: '28px', fontFamily: FONT }}>Announcements</h3>
          <div className="announcements-grid">
            <AnnouncementCard title="Season Finale Now Streaming" date="Dec 15, 2024" category="NEW EPISODE" description="The final two minutes are here. Watch as everything spectacularly falls apart in the season's most chaotic finale." accent="#E11D48" />
            <AnnouncementCard title="Cast Q&A This Friday" date="Dec 20, 2024" category="EVENT" description="Join us for a live Q&A with the cast. Bring your questions about the season finale." accent="#10B981" />
            <AnnouncementCard title="Behind the Scenes Feature" date="Dec 10, 2024" category="EXCLUSIVE" description="Go behind the scenes of the season finale and learn how we filmed the most elaborate disaster sequence." accent="#8B5CF6" />
            <AnnouncementCard title="Season 2 Confirmed" date="Dec 5, 2024" category="NEWS" description="Due to popular demand, Group Project will return for a second season next fall. More chaos coming soon." accent="#F59E0B" />
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── PROFILES PAGE ────────────────────────────────────────────────────────────
const ProfilesPage = () => (
  <div style={{ minHeight: '100vh', background: '#080808', fontFamily: FONT }}>
    <section className="page-header-pad" style={{ textAlign: 'center', borderBottom: '1px solid #111', background: 'linear-gradient(180deg, #0D0D0D 0%, #080808 100%)' }}>
      <p style={{ color: '#4B5563', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>Clarendon College Original Series</p>
      <h2 className="page-header-title" style={{ color: 'white', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '16px' }}>The Study Group</h2>
      <p style={{ color: '#6B7280', fontSize: '15px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>Four students who came together to improve their grades. Instead, they created the most chaotic study group in Clarendon history.</p>
    </section>

    <section className="section-pad">
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="characters-grid">
          {characters.map(c => <CharacterCard key={c.id} character={c} />)}
        </div>
      </div>
    </section>

    <section style={{ padding: '0 16px 60px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', background: '#0D0D0D', border: '1px solid #1a1a1a', borderRadius: '16px' }}>
        <div className="dysfunction-box">
          <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 800, textAlign: 'center', marginBottom: '20px' }}>The Perfect Storm of Dysfunction</h3>
          {[
            "What happens when you put an overachieving Head Girl, a genius who refuses to try, and a theatrical conspiracy theorist in the same study group? Pure academic chaos.",
            "Sophie's obsessive planning clashes with Lewis' complete lack of organisation while Hollie turns every simple task into an elaborate scheme.",
            "Together, they've created the most elaborate ways to avoid actual studying, turned detention into a weekly social event, and somehow made group projects even more complicated than they needed to be. They're failing at academics, but succeeding at friendship - even if they'd never admit it."
          ].map((t, i, arr) => (
            <p key={i} style={{ color: '#6B7280', fontSize: '15px', lineHeight: '1.8', marginBottom: i < arr.length - 1 ? '14px' : 0 }}>{t}</p>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad" style={{ paddingTop: 0 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 800, textAlign: 'center', marginBottom: '28px' }}>Character Quotes</h3>
        <div className="quotes-grid">
          {[
            { name: "Lewis Ramone", quote: "Apparently 'potential' doesn't actually count if you never use it.", accent: '#7C3AED' },
            { name: "Sophie Gee", quote: "I'm only here because I had one bad term. Technically two. The point is this is temporary.", accent: '#0891B2' },
            { name: "Hollie Clayton", quote: "This group is just damage control for their flawed assessment model.", accent: '#BE185D' },
            { name: "Mrs Smith", quote: "You're not being punished, you're being prepared.", accent: '#B45309' }
          ].map((item, i) => (
            <div key={i} style={{ background: '#0D0D0D', border: '1px solid #1a1a1a', borderLeft: `3px solid ${item.accent}`, padding: '20px', borderRadius: '0 12px 12px 0' }}>
              <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: '1.75', fontStyle: 'italic', marginBottom: '10px', fontFamily: FONT_SERIF }}>"{item.quote}"</p>
              <p style={{ color: item.accent, fontSize: '12px', fontWeight: 700, letterSpacing: '0.07em', fontFamily: FONT }}>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// ─── BEHIND THE SCENES PAGE ───────────────────────────────────────────────────
const BTSPage = () => {
  const [modal, setModal] = useState(null);
  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: FONT }}>
      {modal && <YoutubeModal videoId={modal.videoId} title={modal.title} onClose={() => setModal(null)} />}

      <section className="page-header-pad" style={{ textAlign: 'center', borderBottom: '1px solid #111', background: 'linear-gradient(180deg, #0D0D0D 0%, #080808 100%)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#8B5CF612', border: '1px solid #8B5CF630', borderRadius: '100px', padding: '5px 14px', marginBottom: '18px' }}>
          <Camera size={13} color="#8B5CF6" />
          <span style={{ color: '#8B5CF6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Exclusive Access</span>
        </div>
        <h2 className="page-header-title" style={{ color: 'white', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '16px' }}>Behind the Scenes</h2>
        <p style={{ color: '#6B7280', fontSize: '15px', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>Go behind the camera. See how Group Project is made - from the writers' room to the final edit.</p>
      </section>

      <section className="bts-single">
        <BTSCard clip={btsClip} onPlay={c => setModal({ videoId: c.youtubeId, title: c.title })} />
      </section>

      <section style={{ background: '#0A0A0A', borderTop: '1px solid #111' }}>
        <div className="section-pad" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ color: '#4B5563', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px' }}>From the Team</p>
          <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 800, marginBottom: '28px' }}>Production Notes</h3>
          <div className="prod-notes-grid">
            {[
              { title: "Filming Location", body: "The finale was filmed entirely on location at Clarendon College, using the actual classrooms, library, and corridors you see in the show.", icon: Film },
              { title: "Production Timeline", body: "The finale was written, shot, and edited over the course of one academic year, from initial pitch September to final cut.", icon: Calendar },
              { title: "The Cast", body: "Every cast member is a current or former Clarendon College student. No professional actors were used - all performances are unapologetically authentic.", icon: Users }
            ].map(({ title, body, icon: Icon }, i) => (
              <div key={i} style={{ background: '#0F0F0F', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '24px' }}>
                <div style={{ color: '#E11D48', marginBottom: '12px' }}><Icon size={22} strokeWidth={1.5} /></div>
                <h4 style={{ color: 'white', fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>{title}</h4>
                <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.7' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = ({ setCurrentPage }) => (
  <footer style={{ background: '#050505', borderTop: '1px solid #111', padding: '40px 16px 28px', fontFamily: FONT }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div className="footer-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '28px', height: '28px', background: '#E11D48', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '10px' }}>GP</span>
            </div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>Group Project</span>
          </div>
          <p style={{ color: '#374151', fontSize: '13px', lineHeight: '1.7', maxWidth: '300px' }}>An original production from Clarendon College. Season 2 confirmed.</p>
        </div>
        <div>
          <h4 style={{ color: '#4B5563', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Series</h4>
          {[['home', 'Episode Guide'], ['profiles', 'Cast & Crew'], ['bts', 'Behind the Scenes']].map(([page, label]) => (
            <p key={page} onClick={() => setCurrentPage(page)} style={{ color: '#374151', fontSize: '13px', marginBottom: '8px', cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#9CA3AF'}
              onMouseLeave={e => e.currentTarget.style.color = '#374151'}>{label}</p>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid #111', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <p style={{ color: '#1F2937', fontSize: '12px' }}>© 2024 Clarendon College. All rights reserved.</p>
        <p style={{ color: '#1F2937', fontSize: '12px' }}>A fictional production</p>
      </div>
    </div>
  </footer>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <GlobalStyles />
      <NewsTicker />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'profiles' && <ProfilesPage />}
      {currentPage === 'bts' && <BTSPage />}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;