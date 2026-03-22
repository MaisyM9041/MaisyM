import React, { useState, useEffect, useRef } from 'react';
import { Home, Users, BookOpen, Award, Bell, Play, X, Film, Camera, Calendar } from 'lucide-react';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const FONT_SERIF = "Georgia, 'Times New Roman', serif";

// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  blue:       '#1A5CDB',
  blueDark:   '#1347B0',
  blueLight:  '#EBF1FF',
  blueMid:    '#BFCFEE',
  yellow:     '#F5C800',
  yellowDark: '#D4A900',
  yellowLight:'#FFF8CC',
  ink:        '#0E1B2E',
  body:       '#2C3E57',
  muted:      '#5A718A',
  bg:         '#F5F3EE',
  bgSection:  '#EDE9E1',
  white:      '#FFFFFF',
};

const characters = [
  {
    id: 1,
    name: "Lewis Ramone",
    role: "The Class Clown",
    description: "Lewis is charismatic, unserious, and far more likeable than his report would suggest. He drifts through his classes with confidence, humour and a belief that things will sort themselves out. While he pretends not to care about failing, he is still quietly aware that coasting has limits - and being in the group might not bother him as much as he would like to claim, giving him somewhere to land without having to admit he needs it.",
    color: "#7C3AED",
    accent: "#A78BFA",
    photo: "/2.jpg"
  },
  {
    id: 2,
    name: "Sophie Gee",
    role: "The Overachiever",
    description: "With her clear plans, colour-coded notes, and belief that effort leads to results, Sophie has built her entire life around her academic capabilities. She deeply believes that if you work hard enough you will be rewarded. Unfortunately, this theory is repeatedly tested by reality. Whilst others coast and cut corners, she is quietly committed to her grand ambitions and struggles more than she lets on when her grades don't reflect how hard she's trying.",
    color: "#BE185D",
    accent: "#F9A8D4",
    photo: "/1.jpg"
  },
  {
    id: 3,
    name: "Hollie Clayton",
    role: "The Conspiracy Theorist",
    description: "Hollie considers herself far more informed than most people in the room. She has strong opinions about fairness, power and authority - often at length and inappropriately timed. In practice, her worldview is a mix of genuine concern, half-remembered articles, and conclusions she has very confidently reached on her own. She believes school operates on hidden systems designed to benefit the same people every time, and she's constantly trying to expose this.",
    color: "#D4A900",
    accent: "#F5C800",
    photo: "/4.jpg"
  },
  {
    id: 4,
    name: "Mrs Smith",
    role: "The Strictest Teacher in History",
    description: "To the students, she is an obstacle, a deadline, a voice administering remorseless consequences. She runs her classroom with clear expectations and very little patience for chaos. She isn't unfair - just consistent - and believes that structure is a form of care.",
    color: "#15803D",
    accent: "#4ADE80",
    photo: "/3.jpg"
  }
];

const episodes = [
  { number: 10, title: "The Library Lockdown", description: "The group accidentally gets locked in the library overnight and discovers the conspiracy was real all along.", color: "#1D4ED8" },
  { number: 11, title: "Cafeteria Chronicles", description: "Sophie runs for student council while Lewis becomes unexpectedly invested in how he's perceived outside the study group, leading to some questionably uncharacteristic choices.", color: "#065F46" },
  { number: 12, title: "Final Draft", description: "The season finale. The final presentation. The ultimate chaos. Everything goes wrong in the best way possible.", color: "#6D28D9", featured: true }
];

const btsClip = {
  id: 1,
  title: "Behind the Scenes",
  subtitle: "Cast interviews & memories",
  description: "Take a closer look at the making of the series through exclusive interviews with the cast as they reflect on their time bringing these characters and stories to life. Looking back on the show, they share some of their favourite memories and experiences on set.",
  duration: "0:37",
  tag: "PRODUCTION"
};

// ── VIDEO CONFIG ─────────────────────────────────────────────────────────────
const VIDEOS = {
  main: 'https://vimeo.com/1176015399?share=copy&fl=sv&fe=ci',
  bts:  'https://vimeo.com/1176014881?share=copy&fl=sv&fe=ci',
};

// ── Vimeo thumbnail hook ─────────────────────────────────────────────────────
const useVimeoThumbnail = (vimeoUrl) => {
  const [thumb, setThumb] = useState(null);
  useEffect(() => {
    if (!vimeoUrl) return;
    const id = vimeoUrl.replace(/.*vimeo\.com\//, '').replace(/[^0-9]/g, '');
    fetch(`/api/vimeo-thumb?id=${id}`)
      .then(r => r.json())
      .then(d => setThumb(d.thumbnail_url))
      .catch(() => {});
  }, [vimeoUrl]);
  return thumb;
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${C.bg}; font-family: ${FONT}; }

    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

    .nav-tabs { display: flex; align-items: center; gap: 4px; }
    .nav-tab-label { display: inline; }

    .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1280px; margin: 0 auto; padding: 80px 24px 96px; }
    .hero-title { font-size: 72px; }

    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 1280px; margin: 0 auto; }
    .stats-cell { border-right: 2px solid ${C.yellowDark}; }
    .stats-cell:last-child { border-right: none; }

    .episodes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .announcements-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .characters-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .quotes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .prod-notes-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 48px; margin-bottom: 40px; }

    .section-pad { padding: 80px 24px; }
    .section-pad-sm { padding: 60px 24px; }
    .page-header-title { font-size: 50px; }
    .page-header-pad { padding: 80px 24px 60px; }
    .bts-single { max-width: 720px; margin: 0 auto; padding: 64px 24px 80px; }
    .dysfunction-box { padding: 48px; }

    .btn-yellow {
      display: inline-flex; align-items: center; gap: 9px;
      background: ${C.yellow}; color: ${C.ink};
      border: 2px solid ${C.yellowDark}; border-radius: 10px;
      padding: 13px 22px; font-weight: 800; font-size: 14px;
      cursor: pointer; transition: all 0.15s; font-family: ${FONT};
      box-shadow: 3px 3px 0 ${C.yellowDark};
    }
    .btn-yellow:hover { background: ${C.yellowDark}; box-shadow: 1px 1px 0 ${C.yellowDark}; transform: translate(2px,2px); }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 9px;
      background: transparent; color: ${C.blue};
      border: 2px solid ${C.blue}; border-radius: 10px;
      padding: 13px 22px; font-weight: 700; font-size: 14px;
      cursor: pointer; transition: all 0.15s; font-family: ${FONT};
      box-shadow: 3px 3px 0 ${C.blue};
    }
    .btn-outline:hover { background: ${C.blueLight}; box-shadow: 1px 1px 0 ${C.blue}; transform: translate(2px,2px); }

    .card-lift { transition: all 0.2s ease; }
    .card-lift:hover { transform: translateY(-5px) rotate(0.4deg); }

    @media (max-width: 768px) {
      .nav-tab-label { display: none; }
      .nav-tabs { gap: 2px; }
      .hero-grid { grid-template-columns: 1fr; gap: 32px; padding: 48px 16px 56px; }
      .hero-title { font-size: 48px; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .stats-cell:nth-child(2) { border-right: none; }
      .stats-cell:nth-child(3) { border-right: 2px solid ${C.yellowDark}; }
      .episodes-grid { grid-template-columns: 1fr; gap: 16px; }
      .announcements-grid { grid-template-columns: 1fr; }
      .characters-grid { grid-template-columns: 1fr; }
      .quotes-grid { grid-template-columns: 1fr; }
      .prod-notes-grid { grid-template-columns: 1fr; gap: 12px; }
      .footer-grid { grid-template-columns: 1fr; gap: 32px; }
      .section-pad { padding: 48px 16px; }
      .section-pad-sm { padding: 40px 16px; }
      .page-header-pad { padding: 48px 16px 40px; }
      .page-header-title { font-size: 36px; }
      .bts-single { padding: 40px 16px 56px; }
      .dysfunction-box { padding: 28px 20px; }
    }
    @media (max-width: 480px) {
      .hero-title { font-size: 36px; }
      .page-header-title { font-size: 30px; }
    }
  `}</style>
);

// ─── VIDEO MODAL ──────────────────────────────────────────────────────────────
const VideoModal = ({ src, title, onClose }) => {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const isGoogleDrive = src && src.includes('drive.google.com');
  const isVimeo = src && src.includes('vimeo.com');

  const getEmbedSrc = () => {
    if (isVimeo) {
      const id = src.replace(/.*vimeo\.com\//, '').replace(/[^0-9]/g, '');
      return `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`;
    }
    return src;
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(14,27,46,0.94)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '960px', animation: 'fadeUp 0.25s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontFamily: FONT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '12px' }}>{title}</span>
          <button onClick={onClose} style={{ background: C.yellow, border: `2px solid ${C.yellowDark}`, color: C.ink, borderRadius: '6px', padding: '6px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontFamily: FONT, fontWeight: 700, flexShrink: 0 }}>
            <X size={14} /> Close
          </button>
        </div>
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '12px', overflow: 'hidden', boxShadow: `0 40px 100px rgba(0,0,0,0.6), 6px 6px 0 ${C.yellow}`, border: `3px solid ${C.yellow}` }}>
          {(isGoogleDrive || isVimeo) ? (
            <iframe
              src={getEmbedSrc()}
              title={title || 'Video player'}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <video
              src={src}
              controls
              autoPlay
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#000' }}
            >
              Your browser does not support HTML5 video.
            </video>
          )}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', textAlign: 'center', marginTop: '10px', fontFamily: FONT }}>
          Press Esc or click outside to close
        </p>
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
    <div style={{ background: C.yellow, borderBottom: `2px solid ${C.yellowDark}`, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{ background: C.ink, color: C.yellow, padding: '7px 14px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: FONT }}>★ LATEST</div>
      <div style={{ overflow: 'hidden', flex: 1, padding: '7px 0' }}>
        <div style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', transform: `translateX(${offset}px)` }}>
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <span key={i} style={{ color: C.ink, fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', fontFamily: FONT }}>
              <span style={{ marginRight: '8px' }}>◆</span>{item}
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
    <div ref={ref} style={{ textAlign: 'center', padding: '32px 16px' }}>
      <div style={{ color: C.ink, marginBottom: '10px', display: 'flex', justifyContent: 'center' }}><Icon size={22} strokeWidth={2} /></div>
      <div style={{ fontSize: '38px', fontWeight: 900, color: C.ink, letterSpacing: '-0.02em', lineHeight: 1, fontFamily: FONT }}>
        {count.toLocaleString()}{end === 95 ? '%' : end >= 1000 ? '+' : ''}
      </div>
      <div style={{ color: C.body, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '8px', fontFamily: FONT }}>{label}</div>
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
    <nav style={{ background: C.white, borderBottom: `3px solid ${C.yellow}`, position: 'sticky', top: 0, zIndex: 40, fontFamily: FONT }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }} onClick={() => setCurrentPage('home')}>
          <img
            src="/logo.png"
            alt="Group Project logo"
            style={{ height: '40px', width: 'auto', display: 'block', flexShrink: 0 }}
            onError={e => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
          <div style={{ width: '34px', height: '34px', background: C.blue, borderRadius: '6px', border: `2px solid ${C.ink}`, alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `2px 2px 0 ${C.ink}`, display: 'none' }}>
            <span style={{ color: C.white, fontWeight: 900, fontSize: '11px' }}>GP</span>
          </div>
          <div>
            <span style={{ color: C.ink, fontWeight: 800, fontSize: '15px' }}>Group Project</span>
            <span style={{ color: C.blue, fontSize: '10px', display: 'block', letterSpacing: '0.07em', textTransform: 'uppercase', fontWeight: 600 }}>A Bwark Productions Original</span>
          </div>
        </div>
        <div className="nav-tabs">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setCurrentPage(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px',
                borderRadius: '8px', border: currentPage === id ? `2px solid ${C.blue}` : '2px solid transparent',
                cursor: 'pointer', fontWeight: 700, fontSize: '13px', fontFamily: FONT,
                transition: 'all 0.15s',
                background: currentPage === id ? C.blueLight : 'transparent',
                color: currentPage === id ? C.blue : C.muted,
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
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="card-lift"
      style={{ background: C.white, border: `2px solid ${hovered ? C.blue : C.blueMid}`, borderRadius: '14px', overflow: 'hidden', boxShadow: hovered ? `5px 5px 0 ${C.blue}` : `3px 3px 0 ${C.blueMid}`, position: 'relative' }}>
      {ep.featured && <div style={{ position: 'absolute', top: '12px', right: '12px', background: C.yellow, color: C.ink, fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.1em', zIndex: 2, border: `1px solid ${C.yellowDark}` }}>FINALE</div>}
      <div style={{ background: ep.color, height: '8px' }} />
      <div style={{ padding: '18px 20px 20px' }}>
        <span style={{ color: C.muted, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', fontFamily: FONT, display: 'block', marginBottom: '6px' }}>EP. {ep.number}</span>
        <h4 style={{ color: C.ink, fontWeight: 800, fontSize: '16px', marginBottom: '8px', fontFamily: FONT }}>{ep.title}</h4>
        <p style={{ color: C.body, fontSize: '13px', lineHeight: '1.65', fontFamily: FONT }}>{ep.description}</p>
      </div>
    </div>
  );
};

// ─── CHARACTER CARD ───────────────────────────────────────────────────────────
const CharacterCard = ({ character }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="card-lift"
      style={{ background: C.white, border: `2px solid ${hovered ? character.color : C.blueMid}`, borderRadius: '16px', overflow: 'hidden', boxShadow: hovered ? `5px 5px 0 ${character.color}` : `3px 3px 0 ${C.blueMid}`, display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', background: character.color, flexShrink: 0 }}>
        {!imgError ? (
          <img src={character.photo} alt={character.name} onError={() => setImgError(true)}
            style={{ width: '50%', height: 'auto', display: 'block', margin: '0 auto', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.02)' : 'scale(1)' }} />
        ) : (
          <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0,0,0,0.25)', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: '22px', fontFamily: FONT }}>{character.name.split(' ').map(w => w[0]).join('')}</span>
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(255,255,255,0.92)', border: `2px solid ${character.color}`, borderRadius: '100px', padding: '4px 10px' }}>
          <span style={{ color: character.color, fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em', fontFamily: FONT }}>{character.role}</span>
        </div>
      </div>
      <div style={{ padding: '18px 20px 22px' }}>
        <h3 style={{ color: C.ink, fontWeight: 800, fontSize: '18px', marginBottom: '8px', fontFamily: FONT }}>{character.name}</h3>
        <p style={{ color: C.body, fontSize: '14px', lineHeight: '1.7', fontFamily: FONT }}>{character.description}</p>
      </div>
    </div>
  );
};

// ─── ANNOUNCEMENT CARD ────────────────────────────────────────────────────────
const AnnouncementCard = ({ title, date, category, description, accent }) => (
  <div style={{ background: C.white, border: `2px solid ${C.blueMid}`, borderLeft: `5px solid ${accent}`, borderRadius: '0 12px 12px 0', padding: '18px', fontFamily: FONT, boxShadow: `3px 3px 0 ${C.blueMid}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '8px' }}>
      <span style={{ background: accent, color: 'white', fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '100px', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{category}</span>
      <span style={{ color: C.muted, fontSize: '11px', whiteSpace: 'nowrap', fontWeight: 600 }}>{date}</span>
    </div>
    <h4 style={{ color: C.ink, fontWeight: 800, fontSize: '14px', marginBottom: '6px' }}>{title}</h4>
    <p style={{ color: C.body, fontSize: '13px', lineHeight: '1.6' }}>{description}</p>
  </div>
);

// ─── HERO THUMBNAIL ───────────────────────────────────────────────────────────
const HeroThumb = ({ onClick }) => {
  const thumb = useVimeoThumbnail(VIDEOS.main);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        aspectRatio: '16/9',
        background: thumb
        ? `center / cover no-repeat url(${thumb})`
        : `linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`,
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: hovered ? `11px 11px 0 ${C.ink}` : `8px 8px 0 ${C.ink}`,
        border: `3px solid ${C.ink}`,
        transition: 'all 0.2s',
        transform: hovered ? 'translate(-3px,-3px)' : 'translate(0,0)',
      }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,27,46,0.42)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
        <div style={{
          width: '68px', height: '68px', borderRadius: '50%',
          background: C.yellow, border: `3px solid ${C.yellowDark}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 0 8px rgba(245,200,0,0.2)',
          transition: 'transform 0.2s',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}>
          <Play size={26} fill={C.ink} color={C.ink} style={{ marginLeft: '4px' }} />
        </div>
        <div style={{ textAlign: 'center', padding: '0 16px' }}>
          <p style={{ color: 'white', fontWeight: 800, fontSize: '16px', fontFamily: FONT }}>Episode 12 — Final Draft</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '4px', fontFamily: FONT }}>Season Finale</p>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '12px', left: '12px', background: C.yellow, color: C.ink, fontSize: '10px', fontWeight: 900, padding: '5px 12px', borderRadius: '6px', letterSpacing: '0.08em', fontFamily: FONT, border: `2px solid ${C.yellowDark}`, zIndex: 2 }}>SEASON FINALE</div>
    </div>
  );
};

// ─── BTS CARD ─────────────────────────────────────────────────────────────────
const BTSCard = ({ clip, onPlay }) => {
  const [hovered, setHovered] = useState(false);
  const thumb = useVimeoThumbnail(VIDEOS.bts);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="card-lift"
      style={{ background: C.white, border: `2px solid ${hovered ? C.blue : C.blueMid}`, borderRadius: '16px', overflow: 'hidden', boxShadow: hovered ? `5px 5px 0 ${C.blue}` : `3px 3px 0 ${C.blueMid}` }}>
      <div
        onClick={() => onPlay(clip)}
        style={{
          height: '280px',
          background: thumb
            ? `center / cover no-repeat url(${thumb})`
            : `linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative', overflow: 'hidden',
        }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,27,46,0.48)' }} />
        {!thumb && <Film size={80} color="rgba(255,255,255,0.06)" style={{ position: 'absolute' }} />}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: C.yellow, border: `3px solid ${C.yellowDark}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 0 6px rgba(245,200,0,0.2)`,
            transition: 'transform 0.2s',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
          }}>
            <Play size={22} fill={C.ink} color={C.ink} style={{ marginLeft: '3px' }} />
          </div>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontFamily: FONT, fontWeight: 600 }}>{clip.duration}</span>
        </div>
        <div style={{ position: 'absolute', top: '14px', left: '14px', background: C.yellow, border: `2px solid ${C.yellowDark}`, borderRadius: '6px', padding: '3px 10px', zIndex: 2 }}>
          <span style={{ color: C.ink, fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', fontFamily: FONT }}>{clip.tag}</span>
        </div>
      </div>
      <div style={{ padding: '20px 22px 24px' }}>
        <h4 style={{ color: C.ink, fontWeight: 900, fontSize: '18px', marginBottom: '4px', fontFamily: FONT }}>{clip.title}</h4>
        <p style={{ color: C.blue, fontSize: '13px', fontWeight: 700, letterSpacing: '0.03em', marginBottom: '12px', fontFamily: FONT }}>{clip.subtitle}</p>
        <p style={{ color: C.body, fontSize: '14px', lineHeight: '1.7', fontFamily: FONT }}>{clip.description}</p>
      </div>
    </div>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = ({ setCurrentPage }) => {
  const [modal, setModal] = useState(null);
  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: FONT }}>
      {modal && <VideoModal src={modal.src} title={modal.title} onClose={() => setModal(null)} />}

      {/* Hero */}
      <section style={{ background: C.bg, borderBottom: `3px solid ${C.yellow}` }}>
        <div className="hero-grid">
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: C.blue, borderRadius: '100px', padding: '6px 14px', border: `2px solid ${C.ink}`, boxShadow: `2px 2px 0 ${C.ink}` }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.yellow, animation: 'blink 2s infinite', flexShrink: 0 }} />
                <span style={{ color: 'white', fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Now Streaming — Season Finale</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#00A8E1', borderRadius: '100px', padding: '6px 14px', border: `2px solid ${C.ink}`, boxShadow: `2px 2px 0 ${C.ink}` }}>
                <span style={{ color: 'white', fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>On Amazon Prime Video</span>
              </div>
            </div>
            <h1 className="hero-title" style={{ fontWeight: 900, color: C.ink, lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '6px', fontFamily: FONT }}>Group</h1>
            <h1 className="hero-title" style={{ fontWeight: 900, color: C.blue, lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '22px', fontFamily: FONT }}>Project</h1>
            <p style={{ color: C.blue, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>A Bwark Productions Original Series</p>
            <p style={{ color: C.body, fontSize: '15px', lineHeight: '1.8', maxWidth: '440px', marginBottom: '28px' }}>
A mismatched group of students end up in the same after-school tutor group to salvage
their grades. What starts as a reluctant arrangement turns into an unfolding saga of
chaotic teamwork, failed schemes, and accidental bonding.
<br><br></br></br>
Set in a secondary school in North England, Group Project follows Sophie, Lewis and
Hollie as they navigate the experiences of the school system, with each episode finding
them in a unique chaotic situation. The progress they are promised often feels
inconsistent and the students’ different attitudes and expectations towards education
quickly clash.
<br><br></br></br>
The series blends sharp comedy with a grounded coming-of-age narrative, exploring the
pressures and expectations placed on teenagers that don’t always feel realistic. The
group are struggling personally as well as academically, and all dealing with trying to
understand their own goals and identities, and the show focuses on how these journeys
are shaped by their academic experiences and connections with each other. Watch as
the year unfolds, as shared conflicts begin to form something close to a friendship, even
if none of them are willing to admit it.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn-yellow" onClick={() => setModal({ src: VIDEOS.main, title: 'Episode 12 — Final Draft' })}>
                <Play size={15} fill={C.ink} /> Watch Finale
              </button>
              <button className="btn-outline" onClick={() => setCurrentPage('profiles')}>
                <Users size={15} /> Meet the Cast
              </button>
            </div>
          </div>

          <HeroThumb onClick={() => setModal({ src: VIDEOS.main, title: 'Episode 12 — Final Draft' })} />
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: `3px solid ${C.ink}`, background: C.yellow }}>
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
      <section className="section-pad" style={{ borderBottom: `2px solid ${C.blueMid}`, background: C.bg }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: FONT }}>Season Finale</p>
          <h3 style={{ color: C.ink, fontSize: '30px', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '16px', fontFamily: FONT }}>Episode 12: Final Draft</h3>
          <p style={{ color: C.body, fontSize: '16px', lineHeight: '1.8', fontFamily: FONT }}>Despite the intense pressure all year, the group are finally ready for the summer break with their, surprisingly polished, final project — all that's left is to submit it.</p>
        </div>
      </section>

      {/* Episodes */}
      <section className="section-pad" style={{ borderBottom: `2px solid ${C.blueMid}`, background: C.bgSection }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px', gap: '16px' }}>
            <div>
              <p style={{ color: C.blue, fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: FONT }}>Season 1</p>
              <h3 style={{ color: C.ink, fontSize: '24px', fontWeight: 900, fontFamily: FONT }}>Previous Episodes</h3>
            </div>
            <span style={{ color: C.blue, fontSize: '13px', fontFamily: FONT, whiteSpace: 'nowrap', fontWeight: 700, background: C.blueLight, padding: '4px 12px', borderRadius: '100px', border: `1px solid ${C.blueMid}` }}>Season 2 Confirmed ✓</span>
          </div>
          <div className="episodes-grid">
            {episodes.map(ep => <EpisodeCard key={ep.number} ep={ep} />)}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="section-pad" style={{ background: C.bg }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', fontFamily: FONT }}>Updates</p>
          <h3 style={{ color: C.ink, fontSize: '24px', fontWeight: 900, marginBottom: '28px', fontFamily: FONT }}>Announcements</h3>
          <div className="announcements-grid">
            <AnnouncementCard title="Season Finale Now Streaming" date="Dec 15, 2025" category="NEW EPISODE" description="The final two minutes are here. Watch as everything spectacularly falls apart in the season's most chaotic finale." accent={C.blue} />
            <AnnouncementCard title="Cast Q&A This Friday" date="Dec 20, 2025" category="EVENT" description="Join us for a live Q&A with the cast. Bring your questions about the season finale." accent="#10B981" />
            <AnnouncementCard title="Behind the Scenes Feature" date="Dec 10, 2025" category="EXCLUSIVE" description="Go behind the scenes of the season finale and learn how we filmed the most elaborate disaster sequence." accent="#8B5CF6" />
            <AnnouncementCard title="Season 2 Confirmed" date="Dec 5, 2025" category="NEWS" description="Due to popular demand, Group Project will return for a second season next autumn. More chaos coming soon." accent="#D4A900" />
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── PROFILES PAGE ────────────────────────────────────────────────────────────
const ProfilesPage = () => (
  <div style={{ minHeight: '100vh', background: C.bg, fontFamily: FONT }}>
    <section className="page-header-pad" style={{ textAlign: 'center', borderBottom: `3px solid ${C.yellow}`, background: C.yellow }}>
      <p style={{ color: C.ink, fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>Bwark Productions Original Series</p>
      <h2 className="page-header-title" style={{ color: C.ink, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '16px' }}>The Study Group</h2>
      <p style={{ color: C.ink, fontSize: '15px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7', opacity: 0.75 }}>Three students who came together to improve their grades. Instead, they created the most chaotic study group in school history.</p>
    </section>

    <section className="section-pad" style={{ background: C.bg }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="characters-grid">
          {characters.map(c => <CharacterCard key={c.id} character={c} />)}
        </div>
      </div>
    </section>

    <section style={{ padding: '0 16px 60px', background: C.bg }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', background: C.yellowLight, border: `3px solid ${C.yellowDark}`, borderRadius: '16px', boxShadow: `6px 6px 0 ${C.yellowDark}` }}>
        <div className="dysfunction-box">
          <h3 style={{ color: C.ink, fontSize: '22px', fontWeight: 900, textAlign: 'center', marginBottom: '20px' }}>The Perfect Storm of Dysfunction</h3>
          {[
            "What happens when you put an overachieving Head Girl, a genius who refuses to try, and a theatrical conspiracy theorist in the same study group? Pure academic chaos.",
            "Sophie's obsessive planning clashes with Lewis' complete lack of organisation while Hollie turns every simple task into an elaborate scheme.",
            "Together, they've created the most elaborate ways to avoid actual studying, turned detention into a weekly social event, and somehow made group projects even more complicated than they needed to be. They're failing at academics, but succeeding at friendship — even if they'd never admit it."
          ].map((t, i, arr) => (
            <p key={i} style={{ color: C.body, fontSize: '15px', lineHeight: '1.8', marginBottom: i < arr.length - 1 ? '14px' : 0 }}>{t}</p>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad" style={{ paddingTop: 0, background: C.bgSection }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h3 style={{ color: C.ink, fontSize: '24px', fontWeight: 900, textAlign: 'center', marginBottom: '28px' }}>Character Quotes</h3>
        <div className="quotes-grid">
          {[
            { name: "Lewis Ramone", quote: "Apparently 'potential' doesn't actually count if you never use it.", accent: '#7C3AED' },
            { name: "Sophie Gee", quote: "I'm only here because I had one bad term. Technically two. The point is this is temporary.", accent: '#BE185D' },
            { name: "Hollie Clayton", quote: "This group is just damage control for their flawed assessment model.", accent: '#D4A900' },
            { name: "Mrs Smith", quote: "You're not being punished, you're being prepared.", accent: '#15803D' }
          ].map((item, i) => (
            <div key={i} style={{ background: C.white, border: `2px solid ${C.blueMid}`, borderLeft: `5px solid ${item.accent}`, padding: '20px', borderRadius: '0 12px 12px 0', boxShadow: `3px 3px 0 ${C.blueMid}` }}>
              <p style={{ color: C.ink, fontSize: '15px', lineHeight: '1.75', fontStyle: 'italic', marginBottom: '10px', fontFamily: FONT_SERIF }}>"{item.quote}"</p>
              <p style={{ color: item.accent, fontSize: '12px', fontWeight: 800, letterSpacing: '0.07em', fontFamily: FONT }}>{item.name}</p>
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
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: FONT }}>
      {modal && <VideoModal src={modal.src} title={modal.title} onClose={() => setModal(null)} />}

      <section className="page-header-pad" style={{ textAlign: 'center', borderBottom: `3px solid ${C.yellow}`, background: C.blue }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: C.yellow, border: `2px solid ${C.yellowDark}`, borderRadius: '100px', padding: '5px 14px', marginBottom: '18px', boxShadow: `2px 2px 0 ${C.yellowDark}` }}>
          <Camera size={13} color={C.ink} />
          <span style={{ color: C.ink, fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Exclusive Access</span>
        </div>
        <h2 className="page-header-title" style={{ color: 'white', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '16px' }}>Behind the Scenes</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>Go behind the camera with the cast as they talk about their time filming Group Project.</p>
      </section>

      <section className="bts-single">
        <BTSCard clip={btsClip} onPlay={c => setModal({ src: VIDEOS.bts, title: c.title })} />
      </section>

      <section style={{ background: C.bgSection, borderTop: `3px solid ${C.yellowDark}` }}>
        <div className="section-pad" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px' }}>From the Team</p>
          <h3 style={{ color: C.ink, fontSize: '24px', fontWeight: 900, marginBottom: '28px' }}>Production Notes</h3>
          <div className="prod-notes-grid">
            {[
              { title: "Filming Location", body: "The series was filmed on location at a local college, using real classrooms, libraries, and corridors to give the show its authentic, lived-in feel.", icon: Film },
              { title: "Production Timeline", body: "The finale was written, shot, and edited over the course of one academic year, from initial pitch in September to final cut.", icon: Calendar },
              { title: "The Cast", body: "Every cast member brings an authentic, grounded performance to the screen. No exaggerated drama — just real, believable characters navigating school life.", icon: Users }
            ].map(({ title, body, icon: Icon }, i) => (
              <div key={i} style={{ background: C.white, border: `2px solid ${C.blueMid}`, borderRadius: '14px', padding: '24px', boxShadow: `3px 3px 0 ${C.blueMid}` }}>
                <div style={{ color: C.blue, marginBottom: '12px' }}><Icon size={24} strokeWidth={2} /></div>
                <h4 style={{ color: C.ink, fontWeight: 800, fontSize: '16px', marginBottom: '8px' }}>{title}</h4>
                <p style={{ color: C.body, fontSize: '14px', lineHeight: '1.7' }}>{body}</p>
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
  <footer style={{ background: C.ink, borderTop: `4px solid ${C.yellow}`, padding: '40px 16px 28px', fontFamily: FONT }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div className="footer-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: C.yellow, borderRadius: '6px', border: `2px solid ${C.yellowDark}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: C.ink, fontWeight: 900, fontSize: '11px' }}>GP</span>
            </div>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '15px' }}>Group Project</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: '1.7', maxWidth: '300px' }}>An original production from Bwark Productions. Now streaming on Amazon Prime Video. Season 2 confirmed.</p>
        </div>
        <div>
          <h4 style={{ color: C.yellow, fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Series</h4>
          {[['home', 'Episode Guide'], ['profiles', 'Cast & Crew'], ['bts', 'Behind the Scenes']].map(([page, label]) => (
            <p key={page} onClick={() => setCurrentPage(page)} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', marginBottom: '8px', cursor: 'pointer', transition: 'color 0.15s', fontWeight: 600 }}
              onMouseEnter={e => e.currentTarget.style.color = C.yellow}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}>{label}</p>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>© 2026 Bwark Productions. All rights reserved.</p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>A fictional production</p>
      </div>
    </div>
  </footer>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
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