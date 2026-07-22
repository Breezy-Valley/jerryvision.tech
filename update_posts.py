"""
博客更新工具 — 扫描 content/ 目录，自动更新 posts.json。

用法：双击运行，或在终端执行 `python update_posts.py`

约定：
  - .md 文件第一行 # 开头 = 标题
  - 放在 content/blog/ → type: "blog"
  - 放在 content/notes/ → type: "note"
  - 日期从文件名提取（如 2026-08-01-xxx.md），否则用今天
  - 标签从文件名 #tag 提取，或手动补充

已有条目不受影响，只新增未登记的文件。
"""
import json, os, re, sys
from datetime import date

BASE = os.path.dirname(os.path.abspath(__file__))
POSTS_PATH = os.path.join(BASE, 'content', 'posts.json')
CONTENT_DIR = os.path.join(BASE, 'content')

def slugify(text):
    return re.sub(r'[^a-z0-9\u4e00-\u9fff]+', '-', text.lower()).strip('-')

def extract_title(filepath):
    """从 md 第一行 # 提取标题"""
    try:
        with open(filepath, encoding='utf-8') as f:
            first = f.readline().strip()
            if first.startswith('# '):
                return first[2:].strip()
    except Exception:
        pass
    return os.path.splitext(os.path.basename(filepath))[0]

def extract_date(filename):
    """从文件名提取日期 YYYY-MM-DD"""
    m = re.match(r'^(\d{4}-\d{2}-\d{2})', filename)
    return m.group(1) if m else date.today().isoformat()

def extract_tags(filepath):
    """从 md 第二行 <!-- tags: ... --> 提取标签"""
    try:
        with open(filepath, encoding='utf-8') as f:
            f.readline()  # skip title
            second = f.readline().strip()
            if second.startswith('<!--') and 'tags:' in second:
                tags_str = second.replace('<!--', '').replace('-->', '').strip()
                tags_str = tags_str.replace('tags:', '').strip()
                return [t.strip() for t in tags_str.split(',') if t.strip()]
    except Exception:
        pass
    return []

def scan_posts():
    """扫描 content 目录，返回所有 post 条目"""
    posts = {}
    
    for folder, post_type in [('blog', 'blog'), ('notes', 'note')]:
        dirpath = os.path.join(CONTENT_DIR, folder)
        if not os.path.isdir(dirpath):
            continue
        for fname in os.listdir(dirpath):
            if not fname.endswith('.md'):
                continue
            fpath = os.path.join(dirpath, fname)
            rel = os.path.relpath(fpath, BASE).replace('\\', '/')
            pid = slugify(os.path.splitext(fname)[0])
            
            posts[rel] = {
                'id': pid,
                'type': post_type,
                'title': extract_title(fpath),
                'date': extract_date(fname),
                'summary': '',
                'tags': extract_tags(fpath),
                'file': rel
            }
    return posts


# ---- MAIN ----
try:
    with open(POSTS_PATH, encoding='utf-8') as f:
        existing = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    existing = []

existing_files = {p['file'] for p in existing}
scanned = scan_posts()
new_entries = [p for path, p in scanned.items() if p['file'] not in existing_files]

if not new_entries:
    print('没有新文章，posts.json 无需更新。')
    sys.exit(0)

print(f'发现 {len(new_entries)} 篇新文章：')
for p in new_entries:
    print(f'  [{p["type"]}] {p["date"]}  {p["title"]}')
    if p['tags']:
        print(f'         标签: {", ".join(p["tags"])}')
    if not p['summary']:
        p['summary'] = p['title']  # fallback

merged = existing + new_entries
merged.sort(key=lambda x: x['date'], reverse=True)

with open(POSTS_PATH, 'w', encoding='utf-8') as f:
    json.dump(merged, f, ensure_ascii=False, indent=2)

print(f'\n已更新 posts.json（{len(merged)} 篇文章）')
