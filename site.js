const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const workDetails = window.workDetails = {
  fading: {
    title: '褪色时刻',
    meta: '2026 · AIGC 叙事短片',
    cover: '../作品集/褪色时刻/褪色时刻-封面.jpg',
    alt: '《褪色时刻》封面',
    gallery: [
      '../作品集/褪色时刻/褪色时刻-静帧1.jpg',
      '../作品集/褪色时刻/褪色时刻-静帧2.jpg',
      '../作品集/褪色时刻/褪色时刻-静帧3.jpg',
      '../作品集/褪色时刻/褪色时刻-静帧4.jpg',
      '../作品集/褪色时刻/褪色时刻-静帧5.jpg',
      '../作品集/褪色时刻/褪色时刻-静帧6.jpg'
    ],
    intro: '一次抬头，一次错过。我的第一部 AIGC 创作作品，尝试呈现当代大学生日常中不被察觉的孤独与匆匆。',
    facts: {
      创作时间: '2026.09',
      我的工作: '编剧、导演、剪辑、AIGCer',
      创作方式: '独立完成，从剧本、导演构思到 AIGC 生成与剪辑',
      作品时长: '1 分 48 秒',
      创作记录: '首次 AIGC 影像创作'
    },
    unavailable: '作品待上传'
  },
  dream: {
    title: '以梦为马',
    meta: '2024 · 纪录微电影',
    cover: '../作品集/以梦为马/以梦为马-封面.png',
    alt: '《以梦为马》封面',
    gallery: [
      '../作品集/以梦为马/以梦为马-静帧1.jpg',
      '../作品集/以梦为马/以梦为马-静帧2.jpg',
      '../作品集/以梦为马/以梦为马-静帧3.jpg',
      '../作品集/以梦为马/以梦为马-静帧4.jpg',
      '../作品集/以梦为马/以梦为马-静帧5.jpg',
      '../作品集/以梦为马/以梦为马-静帧6.jpg'
    ],
    intro: '献给 2025 届考研学子的 MV 式纪录微电影。作品从教室、走廊与夜晚学习的细节切入，把备考前的专注、压力和热望组织成一段有节奏的影像叙事。',
    facts: {
      创作时间: '2024.11.28 - 2024.12.11',
      我的工作: '创意指导、主剪辑、拍摄',
      使用工具: '剪映、DaVinci Resolve',
      作品成果: '被校媒收录，并由河南广播电视台、省教育厅等十余家省级媒体收录转载'
    },
    link: 'https://www.hntv.tv/news/1/1867182610791546882'
  },
  apple: {
    title: '用苹果发布会打开软件学院',
    meta: '2024 · 视觉实验短片',
    cover: '../作品集/苹果发布会/苹果发布会-封面.png',
    alt: '《用苹果发布会打开软件学院》封面',
    gallery: [
      '../作品集/苹果发布会/苹果发布会-静帧1.jpg',
      '../作品集/苹果发布会/苹果发布会-静帧2.jpg',
      '../作品集/苹果发布会/苹果发布会-静帧3.jpg',
      '../作品集/苹果发布会/苹果发布会-静帧4.jpg',
      '../作品集/苹果发布会/苹果发布会-静帧5.jpg',
      '../作品集/苹果发布会/苹果发布会-静帧6.jpg'
    ],
    intro: '把产品发布会的节奏、镜头语言和动态包装借到校园影像里，用软件学院的空间与人物做一次轻量但完整的视觉实验。',
    facts: {
      创作时间: '2024',
      我的工作: '视觉创意、拍摄、剪辑、合成',
      使用工具: 'DaVinci Resolve、动态文字与合成流程',
      视觉方向: '发布会语法、校园场景、运动图形'
    },
    link: '../作品集/苹果发布会/Final111.mp4'
  },
  mill: {
    title: '纱厂回响',
    meta: '2026 · 叙事微电影',
    cover: '../assets/mill-coming-soon.svg',
    alt: '《纱厂回响》Coming Soon，影像暂未公开',
    gallery: [],
    intro: '以新乡华新纱厂为场域，通过两名 00 后大学生的对话，把工人夜校、罢工、护厂等历史记忆落到可感知的个人命运里。',
    facts: {
      创作时间: '2026.6.9 - 2026.6.18',
      我的工作: '联合编剧、摄影指导、联合剪辑、调色',
      使用工具: 'DaVinci Resolve',
      作品成果: '课程实践满分作品，全校展播'
    },
    unavailable: '暂不展示'
  },
  road: {
    title: '行则将至',
    meta: '2025 · 叙事短片',
    cover: '../作品集/行则将至/行则将至-封面.jpg',
    alt: '《行则将至》封面',
    gallery: [
      '../作品集/行则将至/行则将至-静帧1.jpg',
      '../作品集/行则将至/行则将至-静帧2.jpg',
      '../作品集/行则将至/行则将至-静帧3.jpg',
      '../作品集/行则将至/行则将至-静帧4.jpg',
      '../作品集/行则将至/行则将至-静帧5.jpg',
      '../作品集/行则将至/行则将至-静帧6.jpg'
    ],
    intro: '送给 2026 届考研学子的短片。作品用跑步意象把学习过程具象化，在电影化演绎与实景记录之间交叉推进。',
    facts: {
      创作时间: '2025.11.24 - 2025.12.13',
      我的工作: '导演、创意总监、摄影指导、剪辑指导',
      制作流程: '脚本、分镜、选角、拍摄、剪辑、调色',
      使用工具: 'Previs Pro、DaVinci Resolve'
    },
    link: 'https://v.douyin.com/Wjpgb680jI0/'
  },
  autumn: {
    title: '秋意漫洒',
    meta: '2025 · 校园风光短片',
    cover: '../作品集/秋意漫洒/秋意漫洒-静帧1.png',
    alt: '《秋意漫洒》航拍画面',
    gallery: [
      '../作品集/秋意漫洒/秋意漫洒-静帧1.png',
      '../作品集/秋意漫洒/秋意漫洒-静帧2.png',
      '../作品集/秋意漫洒/秋意漫洒-静帧3.png',
      '../作品集/秋意漫洒/秋意漫洒-静帧4.png',
      '../作品集/秋意漫洒/秋意漫洒-静帧5.png',
      '../作品集/秋意漫洒/秋意漫洒-静帧6.png'
    ],
    intro: '以无人机高空视角捕捉校园秋日层次，让建筑、树影和道路在音乐节奏里缓慢展开。',
    facts: {
      创作时间: '2025.11',
      我的工作: '无人机拍摄、剪辑、调色',
      使用工具: 'DaVinci Resolve',
      作品成果: '被河南师范大学党委宣传部官方平台收录发布'
    }
  },
  campus: {
    title: '带你"云"逛平原湖校区',
    meta: '2025 · 全景视频系列',
    cover: '../作品集/云逛平原湖/大门.jpg',
    alt: '平原湖校区大门',
    gallery: [
      '../作品集/云逛平原湖/大门.jpg',
      '../作品集/云逛平原湖/图书馆.jpg',
      '../作品集/云逛平原湖/向真楼.jpg',
      '../作品集/云逛平原湖/操场.jpg',
      '../作品集/云逛平原湖/教室.jpg',
      '../作品集/云逛平原湖/宿舍区-低.jpg'
    ],
    intro: '用全景影像把校门、楼宇、教室、操场与宿舍区串联起来，让观看者在画面中完成一次轻量的校园漫游。',
    facts: {
      创作时间: '2025',
      我的工作: '全景拍摄、剪辑、系列策划',
      作品形式: '全景视频系列，6 集',
      视觉重点: '空间导览、校园动线、沉浸感'
    }
  },
  possibility: {
    title: '我们的可能',
    meta: '2025 · 活动纪实',
    coverText: '我们的可能',
    gallery: [],
    intro: '第 62 届校运会影像记录。项目资料正在整理，后续会补充成片、静帧和完整制作说明。',
    facts: {
      创作时间: '2025',
      我的工作: '融媒体创作项目',
      当前状态: '资料归档中',
      后续计划: '补充画面素材与项目复盘'
    }
  },
  shuttle: {
    title: '平原湖校区穿梭日志',
    meta: '2025 · 校园短片',
    coverText: '穿梭日志',
    gallery: [],
    intro: '以行走和切换的节奏观察校园。项目资料正在整理，后续会补充作品介绍与画面素材。',
    facts: {
      创作时间: '2025',
      我的工作: '创意指导、摄影、剪辑',
      当前状态: '资料归档中',
      后续计划: '补充静帧与创作说明'
    }
  }
};

const detail = document.querySelector('#work-detail');

if (detail) {
  const panel = detail.querySelector('.work-detail__panel');
  const coverFigure = detail.querySelector('.work-detail__cover');
  const coverImg = detail.querySelector('#work-detail-cover');
  const title = detail.querySelector('#work-detail-title');
  const meta = detail.querySelector('#work-detail-meta');
  const gallery = detail.querySelector('#work-detail-gallery');
  const intro = detail.querySelector('#work-detail-intro');
  const facts = detail.querySelector('#work-detail-facts');
  const link = detail.querySelector('#work-detail-link');
  let lastTrigger = null;

  const clearElement = (element) => {
    while (element.firstChild) element.removeChild(element.firstChild);
  };

  const openWork = (workId, trigger) => {
    const work = workDetails[workId];
    if (!work) return;

    lastTrigger = trigger;
    clearElement(coverFigure);
    clearElement(gallery);
    clearElement(facts);

    if (work.cover) {
      const image = coverImg.cloneNode();
      image.src = work.cover;
      image.alt = work.alt || work.title;
      coverFigure.classList.remove('is-placeholder');
      coverFigure.appendChild(image);
    } else {
      const placeholder = document.createElement('strong');
      placeholder.textContent = work.coverText || work.title;
      coverFigure.classList.add('is-placeholder');
      coverFigure.appendChild(placeholder);
    }

    title.textContent = work.title;
    meta.textContent = work.meta;
    intro.textContent = work.intro;

    work.gallery.forEach((src) => {
      const image = document.createElement('img');
      image.src = src;
      image.alt = `${work.title}静帧`;
      gallery.appendChild(image);
    });

    if (!work.gallery.length) {
      const note = document.createElement('p');
      note.className = 'work-detail__empty';
      note.textContent = work.unavailable ? '影像暂未公开。' : '静帧素材整理中。';
      gallery.appendChild(note);
    }

    Object.entries(work.facts).forEach(([label, value]) => {
      const item = document.createElement('div');
      const term = document.createElement('dt');
      const description = document.createElement('dd');
      term.textContent = label;
      description.textContent = value;
      item.append(term, description);
      facts.appendChild(item);
    });

    link.classList.toggle('is-unavailable', Boolean(work.unavailable));
    link.removeAttribute('aria-disabled');
    link.removeAttribute('tabindex');
    link.removeAttribute('role');
    link.innerHTML = '观看作品 <span>↗</span>';
    if (work.unavailable) {
      link.hidden = false;
      link.removeAttribute('href');
      link.setAttribute('role', 'link');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('tabindex', '-1');
      link.replaceChildren(document.createTextNode(work.unavailable));
      const icon = document.createElement('span');
      icon.textContent = '×';
      icon.setAttribute('aria-hidden', 'true');
      link.appendChild(icon);
    } else if (work.link) {
      link.hidden = false;
      link.href = work.link;
    } else {
      link.hidden = true;
      link.removeAttribute('href');
    }

    detail.hidden = false;
    detail.setAttribute('aria-hidden', 'false');
    document.body.classList.add('detail-open');
    requestAnimationFrame(() => panel.focus());
  };

  const closeWork = () => {
    detail.hidden = true;
    detail.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('detail-open');
    if (workDetails[location.hash.replace('#', '')]) {
      history.replaceState(null, '', location.pathname);
    }
    if (lastTrigger) lastTrigger.focus();
  };

  document.querySelectorAll('.work-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openWork(trigger.dataset.work, trigger);
      history.replaceState(null, '', `#${trigger.dataset.work}`);
    });
  });

  detail.querySelectorAll('[data-work-close]').forEach((closer) => {
    closer.addEventListener('click', closeWork);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !detail.hidden) closeWork();
  });

  const openFromHash = () => {
    const workId = window.location.hash.replace('#', '');
    const trigger = document.querySelector(`.work-trigger[data-work="${workId}"]`);
    if (workId && workDetails[workId]) openWork(workId, trigger);
  };

  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  /* Lightbox for gallery images — click to view full-size */
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeLightbox = () => { lightbox.hidden = true; lightbox.setAttribute('aria-hidden','true'); lightboxImage.src = ''; document.body.classList.remove('lightbox-open'); };
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-close-btn').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });
  gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && e.target.src) {
      lightboxImage.src = e.target.src;
      lightboxImage.alt = e.target.alt;
      lightbox.hidden = false;
      lightbox.setAttribute('aria-hidden','false');
      document.body.classList.add('lightbox-open');
    }
  });
}

/* ================================================
   JOURNAL / BLOG ENGINE — 年分组 · 标签 · TOC
   ================================================ */

const journalPage = document.querySelector('[data-journal]');

if (journalPage) {
  const list = document.querySelector('#journal-list');
  const article = document.querySelector('#journal-article');
  const tocAside = document.querySelector('#journal-toc');
  const type = journalPage.dataset.journal;
  const rootPrefix = location.pathname.includes('/blog/') || location.pathname.includes('/notes/') ? '../' : './';

  /* Back button */
  const backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.className = 'journal-back';
  backBtn.textContent = '← 返回列表';
  backBtn.addEventListener('click', () => {
    journalPage.classList.remove('journal-mode-article');
    article.innerHTML = '';
    tocAside.innerHTML = '';
    history.replaceState(null, '', location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  article.before(backBtn);

  const escapeHtml = (value) => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  /* ---- inline Markdown ---- */
  const inlineMarkdown = (value) => escapeHtml(value)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  /* ---- full Markdown → HTML ---- */
  const markdownToHtml = (markdown) => {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n');
    const html = [];
    let paragraph = [];
    let listItems = [];
    let headingIndex = 0;

    const flushParagraph = () => {
      if (!paragraph.length) return;
      html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
      paragraph = [];
    };
    const flushList = () => {
      if (!listItems.length) return;
      html.push(`<ul>${listItems.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`);
      listItems = [];
    };
    const slugify = (text) => 'h-' + (++headingIndex) + '-' + text.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-+|-+$/g, '');

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) { flushParagraph(); flushList(); return; }
      const h2 = trimmed.match(/^## (.+)/);
      if (h2) { flushParagraph(); flushList(); html.push(`<h2 id="${slugify(h2[1])}">${inlineMarkdown(h2[1])}</h2>`); return; }
      const h1 = trimmed.match(/^# (.+)/);
      if (h1) { flushParagraph(); flushList(); html.push(`<h1 id="${slugify(h1[1])}">${inlineMarkdown(h1[1])}</h1>`); return; }
      if (/^[-*]\s+/.test(trimmed)) { flushParagraph(); listItems.push(trimmed.replace(/^[-*]\s+/, '')); return; }
      if (/^\d+\.\s+/.test(trimmed)) { flushParagraph(); listItems.push(trimmed.replace(/^\d+\.\s+/, '')); return; }
      paragraph.push(trimmed);
    });
    flushParagraph(); flushList();
    return html.join('');
  };

  /* ---- TOC ---- */
  const buildTOC = (markdown) => {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n');
    const items = [];
    let index = 0;
    lines.forEach((line) => {
      const h2 = line.trim().match(/^## (.+)/);
      if (h2) { const t = h2[1]; items.push({level:2, text:t, id:'h-'+(++index)+'-'+t.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g,'-').replace(/^-+|-+$/g,'')}); return; }
      const h1 = line.trim().match(/^# (.+)/);
      if (h1) { const t = h1[1]; items.push({level:1, text:t, id:'h-'+(++index)+'-'+t.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g,'-').replace(/^-+|-+$/g,'')}); }
    });
    if (items.length < 2) { tocAside.innerHTML = ''; return; }
    let html = '<h3 class="toc-heading">目录</h3><ul class="toc-list">';
    items.forEach((item) => { html += `<li class="toc-item toc-lvl-${item.level}"><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`; });
    html += '</ul>';
    tocAside.innerHTML = html;
    tocAside.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  /* ---- render post in article mode ---- */
  const renderPost = async (post, button) => {
    list.querySelectorAll('button').forEach((item) => item.classList.remove('is-active'));
    if (button) button.classList.add('is-active');
    article.innerHTML = '<p class="journal-loading">文章读取中…</p>';
    tocAside.innerHTML = '';

    try {
      const response = await fetch(`${rootPrefix}${post.file}`);
      const markdown = await response.text();
      article.innerHTML = `<p class="journal-date">${post.date}</p>${markdownToHtml(markdown)}`;
      buildTOC(markdown);
      journalPage.classList.add('journal-mode-article');
      history.replaceState(null, '', `#${post.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      article.innerHTML = '<p class="journal-loading">没有读到 Markdown 文件。用本地服务器打开页面时会正常加载。</p>';
      journalPage.classList.add('journal-mode-article');
    }
  };

  /* ---- fetch posts, build timeline ---- */
  const typeLabels = { note: '技术手记', blog: '创作手记' };
  fetch(`${rootPrefix}content/posts.json`)
    .then((response) => response.json())
    .then((posts) => (type === 'all' ? posts : posts.filter((post) => post.type === type)))
    .then((posts) => {
      if (!posts.length) {
        list.innerHTML = '<p class="journal-loading">还没有文章。</p>';
        return;
      }
      posts.sort((a, b) => b.date.localeCompare(a.date));
      const grouped = {};
      posts.forEach((post) => {
        const year = post.date.substring(0, 4);
        if (!grouped[year]) grouped[year] = [];
        grouped[year].push(post);
      });
      Object.keys(grouped).sort((a, b) => b - a).forEach((year) => {
        const yearHeader = document.createElement('div');
        yearHeader.className = 'journal-year';
        yearHeader.textContent = year + '年';
        list.appendChild(yearHeader);
        grouped[year].forEach((post) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'journal-item';
          let tagsHtml = '';
          if (post.tags && post.tags.length) {
            tagsHtml = '<span class="journal-tags">' + post.tags.map((t) => `<i>#${escapeHtml(t)}</i>`).join('') + '</span>';
          }
          const typeBadge = type === 'all' ? `<em class="journal-type journal-type--${post.type}">${typeLabels[post.type] || post.type}</em>` : '';
          button.innerHTML = `<time>${post.date.substring(5)}</time>${typeBadge}<strong>${post.title}</strong><span>${post.summary}</span>${tagsHtml}`;
          button.addEventListener('click', () => renderPost(post, button));
          list.appendChild(button);
        });
      });

      /* Open from URL hash if present */
      const hashId = location.hash.replace('#', '');
      if (hashId) {
        const activePost = posts.find((post) => post.id === hashId);
        if (activePost) {
          const activeButton = Array.from(list.querySelectorAll('button')).find((b) => b.querySelector('strong').textContent === activePost.title);
          renderPost(activePost, activeButton);
        }
      }
    })
    .catch(() => {
      list.innerHTML = '<p class="journal-loading">没有读到文章目录。</p>';
    });
}
