import { PropsWithChildren, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const transitions: Record<string, string> = {
  'home:works': '/cinema-optimized/home-to-portfolio.mp4',
  'home:notes': '/cinema-optimized/home-to-about.mp4',
  'works:home': '/cinema-optimized/portfolio-to-home.mp4',
  'notes:home': '/cinema-optimized/about-to-home.mp4',
  'works:notes': '/cinema-optimized/portfolio-to-about.mp4',
  'notes:works': '/cinema-optimized/about-to-portfolio.mp4',
  'home:about': '/cinema-optimized/home-to-about.mp4',
  'works:about': '/cinema-optimized/portfolio-to-about.mp4',
  'about:home': '/cinema-optimized/about-to-home.mp4',
  'about:works': '/cinema-optimized/about-to-portfolio.mp4',
};

const sceneFor = (path: string) => path.startsWith('/works') ? 'works' : path.startsWith('/notes') ? 'notes' : path.startsWith('/about') ? 'about' : 'home';

export function AppShell({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const film = useRef<HTMLVideoElement | null>(null);
  const [busy, setBusy] = useState(false);

  const go = async (path: string) => {
    if (busy || path === location.pathname) return;
    const video = film.current;
    setBusy(true);
    const source = transitions[`${sceneFor(location.pathname)}:${sceneFor(path)}`];
    if (video && source && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.src = source;
      video.autoplay = true;
      video.classList.remove('is-settling');
      try {
        await new Promise<void>((resolve, reject) => {
          let finished = false;
          const done = () => { if (!finished) { finished = true; resolve(); } };
          const fail = () => { if (!finished) { finished = true; reject(new Error('transition media failed')); } };
          const start = async () => {
            video.classList.add('is-visible');
            try { await video.play(); } catch { fail(); }
          };
          video.addEventListener('loadeddata', start, { once: true });
          video.addEventListener('canplay', start, { once: true });
          video.addEventListener('ended', done, { once: true });
          video.addEventListener('error', fail, { once: true });
          window.setTimeout(fail, 8000);
          video.load();
        });
      } catch { /* fallback to immediate navigation */ }
      navigate(path);
      video.pause(); video.classList.add('is-settling');
      await new Promise((resolve) => window.setTimeout(resolve, 680));
      video.classList.remove('is-visible', 'is-settling'); video.autoplay = false; video.removeAttribute('src'); video.load();
    } else navigate(path);
    setBusy(false);
  };

  return <div className="app-shell">
    <div className={`app-stage scene-${sceneFor(location.pathname)}`} aria-hidden="true"><img src={`/assets/cinema/${sceneFor(location.pathname) === 'works' ? 'portfolio.jpg' : sceneFor(location.pathname) === 'about' || sceneFor(location.pathname) === 'notes' ? 'about.png' : 'home.png'}`} alt="" /><video ref={film} muted playsInline preload="none" /></div>
    <header className="app-header"><Link className="wordmark" to="/" onClick={(e: any) => { e.preventDefault(); go('/'); }}>JERRY <i>YUAN</i></Link><span>VISUAL · CODE</span></header>
    <main>{children}</main>
    <nav className="app-nav" aria-label="主导航">
      <button disabled={busy} className={location.pathname === '/' ? 'is-active' : ''} onClick={() => go('/')}>首页</button>
      <button disabled={busy} className={location.pathname.startsWith('/works') ? 'is-active' : ''} onClick={() => go('/works')}>作品集</button>
      <button disabled={busy} className={location.pathname.startsWith('/notes') ? 'is-active' : ''} onClick={() => go('/notes')}>手记</button>
      <button disabled={busy} className={location.pathname.startsWith('/about') ? 'is-active' : ''} onClick={() => go('/about')}>关于我</button>
    </nav>
  </div>;
}
