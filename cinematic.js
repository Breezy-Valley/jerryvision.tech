const cinema = document.querySelector('.cinema');
const film = document.querySelector('#transition-film');
const status = document.querySelector('#transition-status');
const sceneNumber = document.querySelector('#scene-number');
const stills = [...document.querySelectorAll('[data-still]')];
const contents = [...document.querySelectorAll('[data-content]')];
const sceneButtons = [...document.querySelectorAll('[data-go]')];
const cinemaNav = document.querySelector('.cinema-nav');
const navIndicator = document.querySelector('.nav-indicator');
const navButtons = [...document.querySelectorAll('.cinema-nav [data-go]')];
const yearButtons = [...document.querySelectorAll('[data-year-filter]')];
const sceneWorks = [...document.querySelectorAll('.scene-work[data-year]')];
const workScroll = document.querySelector('#work-scroll');
const yearLine = document.querySelector('#year-line');
const yearSections = [...document.querySelectorAll('[data-year-section]')];

const motion = Object.freeze({ fast: 180, base: 360, slow: 620, shared: 680 });
const motionEase = 'cubic-bezier(.16, .75, .25, 1)';

const scenes = ['home', 'portfolio', 'about'];
const labels = { home: '首页', portfolio: '作品集', about: '关于我' };
const routes = {
  'home:portfolio': './cinema-optimized/home-to-portfolio.mp4',
  'portfolio:home': './cinema-optimized/portfolio-to-home.mp4',
  'home:about': './cinema-optimized/home-to-about.mp4',
  'about:home': './cinema-optimized/about-to-home.mp4',
  'portfolio:about': './cinema-optimized/portfolio-to-about.mp4',
  'about:portfolio': './cinema-optimized/about-to-portfolio.mp4'
};

let currentScene = 'home';
let transitioning = false;
let transitionFallback = 0;
let transitionToken = 0;

function ensureStill(name) {
  const still = stills.find((item) => item.dataset.still === name);
  if (!still || still.hasAttribute('src') || !still.dataset.src) return;
  still.src = still.dataset.src;
  still.loading = 'eager';
  still.decoding = 'async';
}

function setScene(name, updateHistory = true) {
  currentScene = name;
  ensureStill(name);
  cinema.dataset.scene = name;
  sceneNumber.textContent = String(scenes.indexOf(name) + 1).padStart(2, '0');

  stills.forEach((still) => still.classList.toggle('is-visible', still.dataset.still === name));
  contents.forEach((content) => {
    const active = content.dataset.content === name;
    content.classList.toggle('is-active', active);
    content.setAttribute('aria-hidden', String(!active));
  });
  navButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.go === name));
  trackNavIndicator();
  if (updateHistory) history.replaceState({ scene: name }, '', name === 'home' ? location.pathname : `#${name}`);
}

function trackNavIndicator() {
  if (!cinemaNav || !navIndicator) return;
  const active = navButtons.find((button) => button.classList.contains('is-active'));
  if (!active) { cinemaNav.classList.remove('is-tracked'); return; }
  const navRect = cinemaNav.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  navIndicator.style.width = `${activeRect.width}px`;
  navIndicator.style.transform = `translateX(${activeRect.left - navRect.left - 5}px)`;
  cinemaNav.classList.add('is-tracked');
}

window.addEventListener('resize', trackNavIndicator);

async function finishTransition(target, token = transitionToken) {
  if (token !== transitionToken || cinema.classList.contains('is-settling')) return;
  window.clearTimeout(transitionFallback);
  film.pause();
  // Keep the final decoded frame on screen while the destination still fades in.
  // Seeking slightly before duration avoids browsers displaying a blank end frame.
  if (Number.isFinite(film.duration) && film.duration > 0) {
    const finalTime = Math.max(0, film.duration - (1 / 24));
    if (Math.abs(film.currentTime - finalTime) > 0.02) {
      await new Promise((resolve) => {
        let settled = false;
        const done = () => { if (!settled) { settled = true; resolve(); } };
        film.addEventListener('seeked', done, { once: true });
        window.setTimeout(done, 120);
        try { film.currentTime = finalTime; } catch { done(); }
      });
    }
  }
  if (token !== transitionToken) return;
  setScene(target);
  const settleDuration = film.classList.contains('is-visible') ? motion.shared : 0;
  cinema.classList.add('is-arriving', 'is-settling');
  film.classList.add('is-settling');
  film.classList.remove('is-visible');
  status.hidden = true;
  window.setTimeout(() => {
    film.removeAttribute('src');
    film.load();
    film.classList.remove('is-settling');
    cinema.classList.remove('is-transitioning', 'is-arriving', 'is-settling');
    transitioning = false;
    sceneButtons.forEach((button) => { button.disabled = false; });
  }, settleDuration);
}

function travelTo(target) {
  if (transitioning || target === currentScene || !scenes.includes(target)) return;
  const source = routes[`${currentScene}:${target}`];
  if (!source) {
    setScene(target);
    return;
  }

  transitioning = true;
  const token = ++transitionToken;
  if (window.matchMedia('(max-width: 900px) and (orientation: portrait)').matches) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  cinema.classList.add('is-transitioning');
  status.querySelector('span').textContent = `正在前往${labels[target]}`;
  status.hidden = false;
  sceneButtons.forEach((button) => { button.disabled = true; });

  film.onloadeddata = () => {
    if (token !== transitionToken) return;
    film.classList.remove('is-settling');
    film.classList.add('is-visible');
    status.hidden = true;
    film.play().catch(() => finishTransition(target, token));
  };
  film.onended = () => finishTransition(target, token);
  film.onerror = () => finishTransition(target, token);
  film.src = source;
  film.load();
  transitionFallback = window.setTimeout(() => finishTransition(target, token), 15000);
}

sceneButtons.forEach((button) => button.addEventListener('click', () => travelTo(button.dataset.go)));
window.addEventListener('hashchange', () => {
  const target = location.hash.slice(1) || 'home';
  if (scenes.includes(target)) travelTo(target);
});

const initialScene = location.hash.slice(1);
if (scenes.includes(initialScene)) setScene(initialScene, false);

function selectYear(year) {
  yearButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.yearFilter === year));
}

yearButtons.forEach((button) => {
  button.addEventListener('click', () => scrollToYear(button.dataset.yearFilter));
});

let activeYear = yearSections[0]?.dataset.yearSection;
let scrollAnimation = 0;
let scrollTargetYear = null;

function scrollToYear(year) {
  const section = yearSections.find((item) => item.dataset.yearSection === year);
  if (!section || !workScroll) return;
  window.cancelAnimationFrame(scrollAnimation);
  const start = workScroll.scrollTop;
  const target = Math.max(0, section.offsetTop - 8);
  const distance = target - start;
  const duration = Math.min(900, Math.max(motion.slow, Math.abs(distance) * .46));
  const startedAt = performance.now();
  scrollTargetYear = year;
  activeYear = year;
  selectYear(year);

  const tick = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    workScroll.scrollTop = start + distance * eased;
    if (progress < 1) scrollAnimation = window.requestAnimationFrame(tick);
    else scrollTargetYear = null;
  };
  scrollAnimation = window.requestAnimationFrame(tick);
}

yearLine?.addEventListener('wheel', (event) => {
  event.preventDefault();
  if (Math.abs(event.deltaY) < 3) return;
  const currentIndex = yearSections.findIndex((section) => section.dataset.yearSection === activeYear);
  const nextIndex = Math.max(0, Math.min(yearSections.length - 1, currentIndex + Math.sign(event.deltaY)));
  if (nextIndex === currentIndex) return;
  scrollToYear(yearSections[nextIndex].dataset.yearSection);
}, { passive: false });

workScroll?.addEventListener('scroll', () => {
  const scrollTop = workScroll.scrollTop + 40;
  let visibleYear = yearSections[0]?.dataset.yearSection;
  yearSections.forEach((section) => {
    if (section.offsetTop <= scrollTop) visibleYear = section.dataset.yearSection;
  });
  if (visibleYear && !scrollTargetYear) {
    activeYear = visibleYear;
    selectYear(visibleYear);
  }
}, { passive: true });

selectYear(activeYear);

const cinemaDetail = document.querySelector('#cinema-detail');
const cinemaDetailPanel = cinemaDetail?.querySelector('.cinema-detail__panel');
let detailTrigger = null;
let detailAnimating = false;

const assetPath = (path) => path?.replace(/^\.\.\//, './');
const clear = (element) => {
  while (element?.firstChild) element.removeChild(element.firstChild);
};
const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));
const afterLayout = () => new Promise((resolve) => {
  window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
});
const usableRect = (rect) => rect && rect.width > 4 && rect.height > 4
  && rect.bottom > 0 && rect.top < window.innerHeight
  && rect.right > 0 && rect.left < window.innerWidth;

function runSharedTransition(visual, fromRect, toRect) {
  if (!visual || !usableRect(fromRect) || !usableRect(toRect) || typeof visual.animate !== 'function') {
    return Promise.resolve();
  }
  const overlay = document.createElement('div');
  const clone = visual.cloneNode(true);
  clone.classList.remove('is-shared-origin');
  overlay.className = 'shared-work-transition';
  overlay.style.left = `${fromRect.left}px`;
  overlay.style.top = `${fromRect.top}px`;
  overlay.style.width = `${fromRect.width}px`;
  overlay.style.height = `${fromRect.height}px`;
  overlay.appendChild(clone);
  document.body.appendChild(overlay);

  const deltaX = toRect.left - fromRect.left;
  const deltaY = toRect.top - fromRect.top;
  const scaleX = toRect.width / fromRect.width;
  const scaleY = toRect.height / fromRect.height;
  const animation = overlay.animate([
    { transform: 'translate3d(0, 0, 0) scale(1)', boxShadow: '0 10px 28px rgba(0,0,0,.2)' },
    { transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`, boxShadow: '20px 24px 0 rgba(0,0,0,.26), 0 34px 80px rgba(0,0,0,.35)' }
  ], { duration: motion.shared, easing: motionEase, fill: 'forwards' });

  return animation.finished.catch(() => {}).finally(() => overlay.remove());
}

async function prepareCoverImage(cover) {
  const image = cover?.querySelector('img');
  if (!image || image.complete) return;
  await Promise.race([image.decode().catch(() => {}), wait(motion.fast)]);
}

async function openDetail(workId, trigger, pushHistory = true) {
  const work = window.workDetails?.[workId];
  if (!work || !cinemaDetail || detailAnimating) return;
  detailAnimating = true;
  detailTrigger = trigger || document.querySelector(`[data-work="${CSS.escape(workId)}"]`);
  const cover = cinemaDetail.querySelector('#cinema-detail-cover');
  const gallery = cinemaDetail.querySelector('#cinema-detail-gallery');
  const facts = cinemaDetail.querySelector('#cinema-detail-facts');
  const link = cinemaDetail.querySelector('#cinema-detail-link');
  clear(cover); clear(gallery); clear(facts);

  if (work.cover) {
    const image = document.createElement('img');
    image.src = assetPath(work.cover);
    image.alt = work.alt || work.title;
    cover.appendChild(image);
  } else {
    const placeholder = document.createElement('strong');
    placeholder.textContent = work.coverText || work.title;
    cover.appendChild(placeholder);
  }
  cinemaDetail.querySelector('#cinema-detail-title').textContent = work.title;
  cinemaDetail.querySelector('#cinema-detail-meta').textContent = work.meta;
  cinemaDetail.querySelector('#cinema-detail-intro').textContent = work.intro;
  (work.gallery || []).forEach((src) => {
    const image = document.createElement('img');
    image.src = assetPath(src);
    image.alt = `${work.title}静帧`;
    image.loading = 'lazy';
    gallery.appendChild(image);
  });
  Object.entries(work.facts || {}).forEach(([label, value]) => {
    const item = document.createElement('div');
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value;
    item.append(term, description);
    facts.appendChild(item);
  });
  if (work.link) {
    link.hidden = false;
    link.href = assetPath(work.link);
  } else {
    link.hidden = true;
    link.removeAttribute('href');
  }
  const sourceVisual = detailTrigger?.querySelector('.work-thumb');
  const sourceRect = sourceVisual?.getBoundingClientRect();
  const useSharedTransition = usableRect(sourceRect) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  cinemaDetail.hidden = false;
  cinemaDetail.classList.remove('is-closing', 'is-shared-closing');
  cinemaDetail.classList.toggle('is-shared-opening', useSharedTransition);
  cinemaDetail.setAttribute('aria-hidden', 'false');
  document.body.classList.add('detail-open');
  if (pushHistory) history.pushState({ scene: 'portfolio', work: workId, fromPortfolio: true }, '', `#work=${workId}`);
  await prepareCoverImage(cover);
  await afterLayout();

  if (useSharedTransition) {
    const target = cover.firstElementChild || cover;
    const targetRect = target.getBoundingClientRect();
    if (usableRect(targetRect)) {
      sourceVisual.classList.add('is-shared-origin');
      await runSharedTransition(sourceVisual, sourceRect, targetRect);
      sourceVisual.classList.remove('is-shared-origin');
    }
  }
  cinemaDetail.classList.remove('is-shared-opening');
  detailAnimating = false;
  cinemaDetailPanel.focus();
}

async function hideDetail(immediate = false) {
  if (!cinemaDetail || cinemaDetail.hidden || cinemaDetail.classList.contains('is-closing')) return;
  detailAnimating = true;
  const cover = cinemaDetail.querySelector('#cinema-detail-cover');
  const target = cover.firstElementChild || cover;
  const sourceVisual = detailTrigger?.querySelector('.work-thumb');
  const fromRect = target.getBoundingClientRect();
  const toRect = sourceVisual?.getBoundingClientRect();
  const useSharedTransition = !immediate && usableRect(fromRect) && usableRect(toRect)
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  cinemaDetail.classList.add('is-closing');
  cinemaDetail.classList.toggle('is-shared-closing', useSharedTransition);
  document.body.classList.remove('detail-open');
  const finish = () => {
    cinemaDetail.hidden = true;
    cinemaDetail.classList.remove('is-closing', 'is-shared-closing', 'is-shared-opening');
    cinemaDetail.setAttribute('aria-hidden', 'true');
    sourceVisual?.classList.remove('is-shared-origin');
    detailAnimating = false;
    detailTrigger?.focus();
  };
  if (immediate) {
    finish();
  } else if (useSharedTransition) {
    sourceVisual.classList.add('is-shared-origin');
    await runSharedTransition(sourceVisual, fromRect, toRect);
    finish();
  } else {
    await wait(motion.slow);
    finish();
  }
}

sceneWorks.forEach((trigger) => trigger.addEventListener('click', () => openDetail(trigger.dataset.work, trigger)));
cinemaDetail?.querySelectorAll('[data-detail-close]').forEach((closer) => {
  closer.addEventListener('click', () => {
    if (history.state?.fromPortfolio) history.back();
    else {
      hideDetail();
      history.replaceState({ scene: 'portfolio' }, '', '#portfolio');
    }
  });
});
window.addEventListener('popstate', (event) => {
  if (event.state?.work) openDetail(event.state.work, null, false);
  else hideDetail();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cinemaDetail && !cinemaDetail.hidden) {
    if (history.state?.fromPortfolio) history.back();
    else hideDetail();
  }
});

const hashWork = location.hash.match(/^#work=(.+)$/)?.[1];
if (hashWork && window.workDetails?.[hashWork]) {
  setScene('portfolio', false);
  history.replaceState({ scene: 'portfolio', work: hashWork, direct: true }, '', location.href);
  openDetail(hashWork, document.querySelector(`[data-work="${hashWork}"]`), false);
}

const cinemaLightbox = document.querySelector('#cinema-lightbox');
const cinemaLightboxImage = document.querySelector('#cinema-lightbox-image');

function openLightbox(image) {
  if (!cinemaLightbox || !cinemaLightboxImage) return;
  cinemaLightboxImage.src = image.src;
  cinemaLightboxImage.alt = image.alt;
  cinemaLightbox.hidden = false;
  cinemaLightbox.classList.remove('is-closing');
  cinemaLightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!cinemaLightbox || cinemaLightbox.hidden || cinemaLightbox.classList.contains('is-closing')) return;
  cinemaLightbox.classList.add('is-closing');
  window.setTimeout(() => {
    cinemaLightbox.hidden = true;
    cinemaLightbox.classList.remove('is-closing');
    cinemaLightbox.setAttribute('aria-hidden', 'true');
    cinemaLightboxImage.removeAttribute('src');
  }, motion.base);
}

cinemaDetail?.querySelector('#cinema-detail-gallery').addEventListener('click', (event) => {
  if (event.target instanceof HTMLImageElement) openLightbox(event.target);
});
cinemaLightbox?.querySelectorAll('[data-lightbox-close]').forEach((closer) => closer.addEventListener('click', closeLightbox));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cinemaLightbox && !cinemaLightbox.hidden) closeLightbox();
});

// Transition videos stay unloaded until a route is actually requested.
