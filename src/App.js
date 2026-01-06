import React, { useState, useEffect } from 'react';
import { Home, Users, Instagram, Twitter, Youtube, Calendar, BookOpen, Award, Bell, ChevronRight, Sparkles } from 'lucide-react';

// Character data
const characters = [
  {
    id: 1,
    name: "Lewis Ramone",
    role: "The Class Clown",
    description: " Lewis is charismatic, unserious, and far more likeable than his report would suggest. He drifts through his classes with confidence, humour and a belief that things will sort themselves out. While he pretends not to care about failing, he is still quietly aware that coasting has limits, and being in the group might not bother him as much as he would like to claim, giving him somewhere to land without having to admit he needs it. “Apparently ‘potential’ doesn’t actually count if you never use it.”.",
    color: "bg-purple-600",
    avatar: "😎"
  },
  {
    id: 2,
    name: "Sophie Gee",
    role: "The Overachiever",
    description: " With her clear plans, colour-coded notes, and belief that effort leads to results, Sophie has built her entire life around her academic capabilities. She deeply believes that if you work hard enough you will be rewarded and everything will eventually fall into place. Unfortunately, this theory is repeatedly tested by reality. Whilst others coast and cut corners, she is quietly committed to her grand ambitions and struggles more than she lets on when her grades don’t reflect how hard she’s trying.",
    color: "bg-cyan-500",
    avatar: "👩‍💼"
  },
  {
    id: 3,
    name: "Hollie Clayton",
    role: "The Conspiracy Theorist",
    description: " Hollie considers herself far more informed than most people in the room. She has strong opinions about fairness, power and authority, which she isn’t afraid to share (often at length and inappropriately timed.) In practice, her worldview is a mix of genuine concern, half-remembered articles, and conclusions she has very confidently reached on her own. She believes school operates on hidden systems designed to benefit the same people every time, and she’s constantly trying to expose this. However, her certainty can often tip into performance, and her skepticism only becomes a barrier of emotional connection. “This group is just damage control for their flawed assessment model.”",
    color: "bg-pink-500",
    avatar: "🎭"
  },
  {
    id: 4,
    name: "Mrs Smith",
    role: "The Strictest Teacher in History",
    description: "To the students, she is an obstacle, a deadline, a voice administering remorseless consequences. She runs her classroom with clear expectations and very little patience for chaos. She isn’t unfair – just consistent, and believes that structure is a form of care.",
    color: "bg-orange-500",
    avatar: "😎🧑‍🎓"
  }
];

// Folder Component
const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({ color = '#5227FF', size = 1, items = [], className = '' }) => {
  const maxItems = 4;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';
  const paper4 = darkenColor('#ffffff', 0.03);

  const handleClick = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e, index) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const getPaperBackground = (index) => {
    switch(index) {
      case 0: return paper1;
      case 1: return paper2;
      case 2: return paper3;
      case 3: return paper4;
      default: return paper1;
    }
  };

  return (
    <div style={{ transform: `scale(${size})` }} className={className}>
      <style>{`
        .folder {
          transition: all 0.2s ease-in;
          cursor: pointer;
        }
        .folder:not(.folder--click):hover {
          transform: translateY(-8px);
        }
        .folder:not(.folder--click):hover .paper {
          transform: translate(-50%, 0%);
        }
        .folder:not(.folder--click):hover .folder__front {
          transform: skew(15deg) scaleY(0.6);
        }
        .folder:not(.folder--click):hover .right {
          transform: skew(-15deg) scaleY(0.6);
        }
        .folder.open {
          transform: translateY(-8px);
        }
        .folder.open .paper:nth-child(1) {
          transform: translate(-140%, -70%) rotateZ(-20deg);
        }
        .folder.open .paper:nth-child(1):hover {
          transform: translate(-140%, -70%) rotateZ(-20deg) scale(1.1);
        }
        .folder.open .paper:nth-child(2) {
          transform: translate(-40%, -80%) rotateZ(-5deg);
          height: 80%;
        }
        .folder.open .paper:nth-child(2):hover {
          transform: translate(-40%, -80%) rotateZ(-5deg) scale(1.1);
        }
        .folder.open .paper:nth-child(3) {
          transform: translate(40%, -80%) rotateZ(5deg);
          height: 80%;
        }
        .folder.open .paper:nth-child(3):hover {
          transform: translate(40%, -80%) rotateZ(5deg) scale(1.1);
        }
        .folder.open .paper:nth-child(4) {
          transform: translate(140%, -70%) rotateZ(20deg);
          height: 75%;
        }
        .folder.open .paper:nth-child(4):hover {
          transform: translate(140%, -70%) rotateZ(20deg) scale(1.1);
        }
        .folder.open .folder__front {
          transform: skew(15deg) scaleY(0.6);
        }
        .folder.open .right {
          transform: skew(-15deg) scaleY(0.6);
        }
        .folder__back {
          position: relative;
          width: 100px;
          height: 80px;
          background: ${folderBackColor};
          border-radius: 0px 10px 10px 10px;
        }
        .folder__back::after {
          position: absolute;
          z-index: 0;
          bottom: 98%;
          left: 0;
          content: '';
          width: 30px;
          height: 10px;
          background: ${folderBackColor};
          border-radius: 5px 5px 0 0;
        }
        .paper {
          position: absolute;
          z-index: 2;
          bottom: 10%;
          left: 50%;
          transform: translate(-50%, 10%);
          width: 70%;
          height: 80%;
          border-radius: 10px;
          transition: all 0.3s ease-in-out;
        }
        .paper:nth-child(2) {
          width: 80%;
          height: 70%;
        }
        .paper:nth-child(3) {
          width: 90%;
          height: 60%;
        }
        .paper:nth-child(4) {
          width: 85%;
          height: 65%;
        }
        .folder__front {
          position: absolute;
          z-index: 3;
          width: 100%;
          height: 100%;
          background: ${color};
          border-radius: 5px 10px 10px 10px;
          transform-origin: bottom;
          transition: all 0.3s ease-in-out;
        }
      `}</style>
      <div className={`folder ${open ? 'open' : ''}`} onClick={handleClick}>
        <div className="folder__back">
          {papers.map((item, i) => (
            <div
              key={i}
              className={`paper paper-${i + 1}`}
              onMouseMove={e => handlePaperMouseMove(e, i)}
              onMouseLeave={e => handlePaperMouseLeave(e, i)}
              style={{
                background: getPaperBackground(i),
                ...(open ? {
                  transform: `translate(calc(-50% + ${paperOffsets[i]?.x || 0}px), calc(10% + ${paperOffsets[i]?.y || 0}px))`
                } : {})
              }}
            >
              {item}
            </div>
          ))}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

// Animated Ticker Component
const NewsTicker = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => prev - 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const news = [
    "📚 New Episode Every Thursday 7PM",
    "🎭 Season Finale Now Available",
    "🏆 Winner: Best Comedy Ensemble",
    "📝 Behind the Scenes Exclusive",
    "⭐ Trending #1 on StudentTV"
  ];

  return (
    <div className="bg-blue-800 text-white py-2 overflow-hidden">
      <div 
        className="flex gap-8 whitespace-nowrap"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {[...news, ...news, ...news].map((item, idx) => (
          <span key={idx} className="font-semibold">{item}</span>
        ))}
      </div>
    </div>
  );
};

// Animated Stats Counter Component
const StatsCounter = ({ end, label, icon: Icon, color }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className={`text-center p-6 ${color} text-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
      <Icon className="w-12 h-12 mx-auto mb-3" />
      <div className="text-4xl font-bold mb-2">{count.toLocaleString()}</div>
      <div className="text-sm font-semibold opacity-90">{label}</div>
    </div>
  );
};

// Announcement Card Component
const AnnouncementCard = ({ title, date, category, description, color }) => (
  <div className={`bg-white border-l-4 ${color} p-5 rounded-r-lg hover:shadow-lg transition-all transform hover:-translate-y-1`}>
    <div className="flex items-start justify-between mb-2">
      <span className={`text-xs font-bold px-3 py-1 rounded-full ${color.replace('border-', 'bg-')} bg-opacity-20 ${color.replace('border-', 'text-')}`}>
        {category}
      </span>
      <span className="text-xs text-gray-500">{date}</span>
    </div>
    <h4 className="font-bold text-gray-800 mb-2">{title}</h4>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// Episode Card Component
const EpisodeCard = ({ number, title, description, featured, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
        featured ? 'ring-4 ring-yellow-400 shadow-2xl' : 'hover:shadow-xl'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-48 ${color} flex items-center justify-center relative overflow-hidden`}>
        <div className={`text-white text-6xl font-bold transform transition-transform duration-300 ${
          isHovered ? 'scale-110 rotate-3' : 'scale-100'
        }`}>
          {number}
        </div>
        {featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            ⭐ FINALE
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-bold text-gray-800 mb-2">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

// Navigation Component
const Navbar = ({ currentPage, setCurrentPage }) => (
  <nav className="bg-blue-700 text-white shadow-lg">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
            <span className="text-blue-700 font-black text-xl">MHS</span>
          </div>
          <div>
            <h1 className="text-xl font-bold"> Clarendon College</h1>
            <p className="text-xs text-blue-200">Student Television Network</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
              currentPage === 'home' ? 'bg-white text-blue-700 font-bold' : 'hover:bg-blue-600'
            }`}
          >
            <Home size={18} />
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('profiles')}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
              currentPage === 'profiles' ? 'bg-white text-blue-700 font-bold' : 'hover:bg-blue-600'
            }`}
          >
            <Users size={18} />
            Cast Profiles
          </button>
          
          <div className="flex gap-3 ml-4 border-l border-blue-500 pl-4">
            <a href="#" className="hover:text-blue-200 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

// Quick Links Component
const QuickLinks = () => {
  const links = [
    { icon: Calendar, text: "Episode Schedule", color: "bg-blue-600" },
    { icon: BookOpen, text: "Series Guide", color: "bg-green-600" },
    { icon: Award, text: "Awards & Recognition", color: "bg-purple-600" },
    { icon: Bell, text: "Episode Alerts", color: "bg-orange-600" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {links.map((link, idx) => (
        <button
          key={idx}
          className={`${link.color} text-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center gap-3`}
        >
          <link.icon size={32} />
          <span className="font-bold text-sm">{link.text}</span>
          <ChevronRight size={20} />
        </button>
      ))}
    </div>
  );
};

// Home Page Component
const HomePage = ({ setCurrentPage }) => (
  <div className="min-h-screen bg-gray-50">
    <NewsTicker />
    
    {/* Hero Banner */}
    <section className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold mb-4">
              ORIGINAL STUDENT PRODUCTION
            </div>
            <h2 className="text-5xl font-bold mb-4">Group Project</h2>
            <p className="text-xl text-blue-100 mb-2">A  High Original Series</p>
            <p className="text-lg leading-relaxed mb-6">
              Follows a mismatched group of students who end up in the same after-school tutor group to salvage their grades. What starts as a reluctant arrangement turns into an unfolding saga of chaotic teamwork, failed schemes and accidental bonding.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-blue-700 px-6 py-3 rounded font-bold hover:bg-blue-50 transition-colors">
                Watch Season Finale
              </button>
              <button 
                onClick={() => setCurrentPage('profiles')}
                className="border-2 border-white px-6 py-3 rounded font-bold hover:bg-white/10 transition-colors"
              >
                View Cast
              </button>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur">
            <div className="aspect-video bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="text-8xl">🎬</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Quick Links */}
    <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
      <QuickLinks />
    </section>

    {/* Stats Section */}
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">By The Numbers</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCounter end={12} label="Episodes Released" icon={BookOpen} color="bg-blue-600" />
        <StatsCounter end={4} label="Main Cast Members" icon={Users} color="bg-green-600" />
        <StatsCounter end={2500} label="Student Viewers" icon={Award} color="bg-purple-600" />
        <StatsCounter end={95} label="Average Rating" icon={Bell} color="bg-orange-600" />
      </div>
    </section>

    {/* Featured Video - Season Finale */}
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-blue-700 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-2">Season Finale: The Final Two Minutes</h3>
              <p className="text-blue-100">Episode 12 - "Final Draft"</p>
            </div>
            <div className="bg-red-600 px-4 py-2 rounded-full font-bold animate-pulse">
              • LIVE
            </div>
          </div>
        </div>
        <div className="bg-gray-100 border-4 border-blue-700 rounded-b-lg p-8">
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center shadow-2xl">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center mx-auto shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <div className="w-0 h-0 border-l-[24px] border-l-white border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent ml-2"></div>
              </div>
              <div className="text-white">
                <p className="font-bold text-xl mb-2">Watch the Season Finale</p>
                <p className="text-gray-300 text-sm">Final 2 minutes - Everything falls apart spectacularly</p>
                <p className="text-gray-400 text-xs mt-2">Duration: 2:00 | Resolution: 1080p</p>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>About this episode:</strong> After eleven episodes of chaos, the group faces their biggest challenge yet: a final group presentation worth 50% of their final mark. In these final two minutes, watch as their elaborate plan completely unravels in the most spectacular fashion. Everything they've worked for this year comes crashing down.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Recent Episodes */}
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Previous Episodes</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EpisodeCard 
          number={10}
          title="The Library Lockdown"
          description="The group accidentally gets locked in the library overnight and discovers the conspiracy was real all along."
          color="bg-blue-600"
        />
        <EpisodeCard 
          number={11}
          title="Cafeteria Chronicles"
          description="Sophie runs for student council, confident that her preparation and competence will carry her through, until the campaign quickly becomes less about policies and more about PR. Meanwhile, Lewis becomes unexpectedly invested in how he’s perceived by people outside of the study group, leading to some questionably uncharacteristic choices."
          color="bg-green-600"
        />
        <EpisodeCard 
          number={12}
          title="Final Draft"
          description="The season finale. The final presentation. The ultimate chaos. Everything goes wrong in the best way possible."
          featured={true}
          color="bg-purple-600"
        />
      </div>
    </section>

    {/* Announcements */}
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Latest Announcements</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <AnnouncementCard 
          title="Season Finale Now Streaming"
          date="Dec 15, 2024"
          category="NEW EPISODE"
          description="The final two minutes are here! Watch as everything spectacularly falls apart in the season's most chaotic finale."
          color="border-blue-700"
        />
        <AnnouncementCard 
          title="Cast Q&A This Friday"
          date="Dec 20, 2024"
          category="EVENT"
          description="Join us in the auditorium for a live Q&A with the cast. Bring your questions about the season finale!"
          color="border-green-600"
        />
        <AnnouncementCard 
          title="Behind the Scenes Feature"
          date="Dec 10, 2024"
          category="EXCLUSIVE"
          description="Go behind the scenes of the season finale and learn how we filmed the most elaborate disaster sequence."
          color="border-purple-600"
        />
        <AnnouncementCard 
          title="Season 2 Confirmed"
          date="Dec 5, 2024"
          category="NEWS"
          description="Due to popular demand, Group Project will return for a second season next fall. More chaos coming soon!"
          color="border-orange-600"
        />
      </div>
    </section>
  </div>
);

// Character Card Component
const CharacterCard = ({ character }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className={`${character.color} h-48 flex items-center justify-center text-8xl`}>
        {character.avatar}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{character.name}</h3>
        <p className={`font-semibold ${character.color.replace('bg-', 'text-')} mb-3`}>
          {character.role}
        </p>
        <p className="text-gray-600 leading-relaxed">{character.description}</p>
      </div>
    </div>
  );
};

// Profiles Page Component
const ProfilesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NewsTicker />
      
      {/* Header */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Meet the Study Group</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Four students who came together to improve their grades. Instead, they created the most chaotic study group in Clarendon history.
          </p>
        </div>
      </section>

      {/* Character Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {characters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </section>

      {/* Group Dynamic Section */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-blue-50 rounded-lg p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">The Perfect Storm of Dysfunction</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                What happens when you put an overachieving Head Girl, a genius who refuses to try ,and a theatrical conspiracy theorist in the same study group? Pure academic chaos.
              </p>
              <p>
                Sophie's obsessive planning clashes with Lewis' complete lack of organisation while Hollie turns every simple task into an elaborate scheme.
              </p>
              <p>
                Together, they've created the most elaborate ways to avoid actual studying, turned detention into a weekly social event, and somehow made group projects even more complicated than they needed to be. They're failing at academics, but succeeding at friendship, even if they'd never admit it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Cast Fun Facts</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: "Lewis", fact: "Apparently ‘potential’ doesn’t actually count if you never use it", color: "border-purple-600", bg: "bg-purple-50" },
            { name: "Sophie", fact: "I’m only here because I had one bad term. Technically two. The point is this is temporary", color: "border-cyan-500", bg: "bg-cyan-50" },
            { name: "Hollie", fact: "This group is just damage control for their flawed assessment model", color: "border-pink-500", bg: "bg-pink-50" },
            { name: "Mrs Smith", fact: "“You’re not being punished, you’re being prepared", color: "border-orange-500", bg: "bg-orange-50" }
          ].map((item, idx) => (
            <div key={idx} className={`${item.bg} p-6 rounded-lg border-l-4 ${item.color} shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1`}>
              <h4 className="font-bold text-gray-800 mb-2">{item.name}</h4>
              <p className="text-gray-600">{item.fact}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 text-white py-8">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-6">
        <div>
          <h4 className="font-bold mb-3"> Clarendon College</h4>
          <p className="text-gray-400 text-sm">Student Television Network</p>
          <p className="text-gray-400 text-sm">Original Student Production</p>
        </div>
        <div>
          <h4 className="font-bold mb-3">Quick Links</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>Episode Guide</li>
            <li>Production Team</li>
            <li>Student Portal</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Contact</h4>
          <p className="text-gray-400 text-sm">studenttv@high.edu</p>
          <p className="text-gray-400 text-sm">Room 204, Media Center</p>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        <p>© 2024 Clarendon College Student Television. All rights reserved.</p>
        <p className="mt-2">A fictional educational project</p>
      </div>
    </div>
  </footer>
);

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' ? <HomePage setCurrentPage={setCurrentPage} /> : <ProfilesPage />}
      <Footer />
    </div>
  );
};

export default App;