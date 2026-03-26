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
  { number: 10, title: "The Library Lockdown", description: "The group accidentally gets locked in the library overnight and discovers the conspiracy was real all along.", color: "#1D4ED8", image: "/x3.jpg" },
  { number: 11, title: "Cafeteria Chronicles", description: "Sophie runs for student council while Lewis becomes unexpectedly invested in how he's perceived outside the study group, leading to some questionably uncharacteristic choices.", color: "#065F46", image: "/2.png" },
  { number: 12, title: "Final Draft", description: "The season finale. The final presentation. The ultimate chaos. Everything goes wrong in the best way possible.", color: "#6D28D9", featured: true, image: "/1.png" }
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

// ── Thumbnail image paths ────────────────────────────────────────────────────
const THUMBNAILS = {
  main: '/thumbnail-main.jpg',
  bts:  '/thumbnail-bts.jpg',
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: ${FONT};
      background-color: #F9F7F2;
      background-image:
        linear-gradient(to right, transparent 71px, rgba(210,40,40,0.32) 71px, rgba(210,40,40,0.32) 73px, transparent 73px),
        repeating-linear-gradient(
          to bottom,
          transparent,
          transparent 31px,
          rgba(100,130,200,0.12) 31px,
          rgba(100,130,200,0.12) 32px
        );
      background-attachment: fixed;
    }

    /* Noise overlay — SVG feTurbulence rendered as a fixed pseudo-element */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      opacity: 0.038;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E");
      background-repeat: repeat;
      background-size: 300px 300px;
    }

    /* Push all content to the right of the margin line */
    #root {
      padding-left: 88px;
    }

    /* Sticky nav and news ticker span the full width including the margin gutter,
       but their inner content still starts after the margin */
    nav, .ticker-bar {
      margin-left: -88px;
      padding-left: 88px;
    }

    /* Footer spans full width too */
    footer {
      margin-left: -88px;
      padding-left: calc(88px + 16px) !important;
    }

    @media (max-width: 768px) {
      #root { padding-left: 56px; }
      nav, .ticker-bar { margin-left: -56px; padding-left: 56px; }
      footer { margin-left: -56px; padding-left: calc(56px + 16px) !important; }
    }

    @media (max-width: 480px) {
      #root { padding-left: 44px; }
      nav, .ticker-bar { margin-left: -44px; padding-left: 44px; }
      footer { margin-left: -44px; padding-left: calc(44px + 16px) !important; }
    }

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
      .nav-socials { display: none !important; }
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
    <div className="ticker-bar" style={{ background: C.yellow, borderBottom: `2px solid ${C.yellowDark}`, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Social icons */}
          <div className="nav-socials" style={{ display: 'flex', alignItems: 'center', gap: '4px', borderRight: `2px solid ${C.blueMid}`, paddingRight: '10px' }}>
            {[
              {
                title: 'Instagram', color: '#E1306C',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                )
              },
              {
                title: 'TikTok', color: '#010101',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                  </svg>
                )
              },
              {
                title: 'YouTube', color: '#FF0000',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                  </svg>
                )
              },
              {
                title: 'X / Twitter', color: '#000000',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )
              },
            ].map(({ title, color, icon }) => (
              <button key={title} title={title}
                style={{
                  width: '30px', height: '30px', borderRadius: '7px',
                  border: `2px solid ${C.blueMid}`, background: 'transparent',
                  color: C.muted,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s', flexShrink: 0, padding: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = color; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.blueMid; }}
              >{icon}</button>
            ))}
          </div>
          {/* Nav tabs */}
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
      </div>
    </nav>
  );
};

// ─── EPISODE CARD ─────────────────────────────────────────────────────────────
const EpisodeCard = ({ ep }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="card-lift"
      style={{ background: C.white, border: `2px solid ${hovered ? C.blue : C.blueMid}`, borderRadius: '14px', overflow: 'hidden', boxShadow: hovered ? `5px 5px 0 ${C.blue}` : `3px 3px 0 ${C.blueMid}`, position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {ep.featured && <div style={{ position: 'absolute', top: '12px', right: '12px', background: C.yellow, color: C.ink, fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.1em', zIndex: 3, border: `1px solid ${C.yellowDark}` }}>FINALE</div>}

      {/* Thumbnail */}
      <div style={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {!imgError ? (
          <img
            src={ep.image}
            alt={ep.title}
            onError={() => setImgError(true)}
            style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          />
        ) : (
          <div style={{ width: '100%', aspectRatio: '16/9', background: `linear-gradient(135deg, ${ep.color} 0%, ${ep.color}99 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Film size={36} color="rgba(255,255,255,0.25)" />
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: ep.color }} />
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(14,27,46,0.82)', borderRadius: '6px', padding: '3px 10px', backdropFilter: 'blur(4px)' }}>
          <span style={{ color: 'white', fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', fontFamily: FONT }}>EP. {ep.number}</span>
        </div>
      </div>

      <div style={{ padding: '16px 18px 20px' }}>
        <h4 style={{ color: C.ink, fontWeight: 800, fontSize: '15px', marginBottom: '7px', fontFamily: FONT }}>{ep.title}</h4>
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
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        aspectRatio: '16/9',
        background: imgError
          ? `linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`
          : undefined,
        backgroundImage: !imgError ? `url(${THUMBNAILS.main})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: hovered ? `11px 11px 0 ${C.ink}` : `8px 8px 0 ${C.ink}`,
        border: `3px solid ${C.ink}`,
        transition: 'all 0.2s',
        transform: hovered ? 'translate(-3px,-3px)' : 'translate(0,0)',
      }}>
      {/* Hidden img tag to detect load errors */}
      <img
        src={THUMBNAILS.main}
        alt=""
        onError={() => setImgError(true)}
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
      />
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
  const [imgError, setImgError] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="card-lift"
      style={{ background: C.white, border: `2px solid ${hovered ? C.blue : C.blueMid}`, borderRadius: '16px', overflow: 'hidden', boxShadow: hovered ? `5px 5px 0 ${C.blue}` : `3px 3px 0 ${C.blueMid}` }}>
      <div
        onClick={() => onPlay(clip)}
        style={{
          height: '280px',
          background: imgError
            ? `linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`
            : undefined,
          backgroundImage: !imgError ? `url(${THUMBNAILS.bts})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative', overflow: 'hidden',
        }}>
        {/* Hidden img tag to detect load errors */}
        <img
          src={THUMBNAILS.bts}
          alt=""
          onError={() => setImgError(true)}
          style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,27,46,0.48)' }} />
        {imgError && <Film size={80} color="rgba(255,255,255,0.06)" style={{ position: 'absolute' }} />}
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
    <div style={{ minHeight: '100vh', background: 'transparent', fontFamily: FONT }}>
      {modal && <VideoModal src={modal.src} title={modal.title} onClose={() => setModal(null)} />}

      {/* Hero */}
      <section style={{ background: 'transparent', borderBottom: `3px solid ${C.yellow}` }}>
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
            <h1 className="hero-title" style={{ fontWeight: 900, color: C.blue, lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '18px', fontFamily: FONT }}>Project</h1>
            <p style={{ color: C.ink, fontSize: '16px', fontWeight: 700, fontStyle: 'italic', fontFamily: FONT_SERIF, marginBottom: '16px', letterSpacing: '0.01em' }}>"They can't work together. They can't work alone either."</p>
            <p style={{ color: C.blue, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>A Bwark Productions Original Series</p>
            <p style={{ color: C.body, fontSize: '15px', lineHeight: '1.8', maxWidth: '440px', marginBottom: '28px' }}>
A mismatched group of students end up in the same after-school tutor group to salvage
their grades. What starts as a reluctant arrangement turns into an unfolding saga of
chaotic teamwork, failed schemes, and accidental bonding.
<br /><br />
Set in a secondary school in North England, Group Project follows Sophie, Lewis and
Hollie as they navigate the experiences of the school system, with each episode finding
them in a unique chaotic situation. The progress they are promised often feels
inconsistent and the students' different attitudes and expectations towards education
quickly clash.
<br /><br />
The series blends sharp comedy with a grounded coming-of-age narrative, exploring the
pressures and expectations placed on teenagers that don't always feel realistic. The
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
      <section className="section-pad" style={{ borderBottom: `2px solid ${C.blueMid}`, background: 'transparent' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: C.blue, fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: FONT }}>Season Finale</p>
          <h3 style={{ color: C.ink, fontSize: '30px', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '16px', fontFamily: FONT }}>Episode 12: Final Draft</h3>
          <p style={{ color: C.body, fontSize: '16px', lineHeight: '1.8', fontFamily: FONT }}>Despite the intense pressure all year, the group are finally ready for the summer break with their, surprisingly polished, final project — all that's left is to submit it.</p>
        </div>
      </section>

      {/* Episodes */}
      <section className="section-pad" style={{ borderBottom: `2px solid ${C.blueMid}`, background: 'rgba(237,233,225,0.55)' }}>
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
      <section className="section-pad" style={{ background: 'transparent' }}>
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
  <div style={{ minHeight: '100vh', background: 'transparent', fontFamily: FONT }}>
    <section className="page-header-pad" style={{ textAlign: 'center', borderBottom: `3px solid ${C.yellow}`, background: C.yellow }}>
      <p style={{ color: C.ink, fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>Bwark Productions Original Series</p>
      <h2 className="page-header-title" style={{ color: C.ink, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '16px' }}>The Study Group</h2>
      <p style={{ color: C.ink, fontSize: '15px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7', opacity: 0.75 }}>Three students who came together to improve their grades. Instead, they created the most chaotic study group in school history.</p>
    </section>

    <section className="section-pad" style={{ background: 'transparent' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="characters-grid">
          {characters.map(c => <CharacterCard key={c.id} character={c} />)}
        </div>
      </div>
    </section>

    <section style={{ padding: '0 16px 60px', background: 'transparent' }}>
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

    <section className="section-pad" style={{ paddingTop: 0, background: 'rgba(237,233,225,0.55)' }}>
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
    <div style={{ minHeight: '100vh', background: 'transparent', fontFamily: FONT }}>
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

      <section style={{ background: 'rgba(237,233,225,0.55)', borderTop: `3px solid ${C.yellowDark}` }}>
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
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
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