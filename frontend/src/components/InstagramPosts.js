import { useEffect } from 'react';
import { INSTAGRAM_POST_URLS } from '@/config/social';

const EMBED_SRC = 'https://www.instagram.com/embed.js';

export default function InstagramPosts() {
  useEffect(() => {
    if (!INSTAGRAM_POST_URLS.length) return;
    const process = () => window.instgrm?.Embeds?.process();
    if (document.querySelector(`script[src="${EMBED_SRC}"]`)) { process(); return; }
    const s = document.createElement('script');
    s.src = EMBED_SRC;
    s.async = true;
    s.onload = process;
    document.body.appendChild(s);
  }, []);

  if (!INSTAGRAM_POST_URLS.length) return null;

  return (
    <div data-testid="instagram-posts" className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
      {INSTAGRAM_POST_URLS.slice(0, 3).map((url) => (
        <blockquote
          key={url}
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)', margin: 0, maxWidth: '100%', minWidth: 0, width: '100%' }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer" className="block p-6 text-center font-body text-sm text-[#666]">View this post on Instagram</a>
        </blockquote>
      ))}
    </div>
  );
}
