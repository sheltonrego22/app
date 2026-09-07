import InstagramPosts from '@/components/InstagramPosts';

const INSTAGRAM = "https://www.instagram.com/eurogulfmobility/";
const LINKEDIN = "https://www.linkedin.com/company/105403528/";
const YOUTUBE = "https://www.youtube.com/@EurogulfMobilityGroup-x1n";
const FACEBOOK = "https://www.facebook.com/people/Eurogulf-Mobility-Group/61567335605176/";

const featuredStories = [
  { badge: "IMT", badgeCls: "from-[#EE5A01]/20 to-black text-[#EE5A01] opacity-30", tag: "Events", title: "Main Mobility Partner for IMT Dubai Vaudeville 2026", text: "Driving the spotlight at the UAE's premier events. Eurogulf Mobility Group is proud to be the official mobility partner for IMT Dubai's Vaudeville 2026." },
  { badge: "WTA", badgeCls: "from-yellow-500/10 to-black text-yellow-500/30", tag: "Awards", title: "World Travel Awards 2026 Nominations", text: "Europcar Dubai and Royal Limousine have both been nominated at the World Travel Awards 2026, recognising their contribution to premium mobility across the UAE." },
  { badge: "LDP", badgeCls: "from-[#EE5A01]/10 to-black text-[#EE5A01]/30", tag: "People", title: "Leadership Development Programme 2026", text: "Investing in the next generation of leaders. The Eurogulf Mobility Group Leadership Development Programme empowers rising talent across all divisions." },
];

const socialImages = [
  { img: "https://images.unsplash.com/photo-1607414851776-f2fcc379fb48?w=600&h=600&fit=crop", caption: "Dubai skyline at golden hour" },
  { img: "https://egmg.ae/wp-content/uploads/2025/06/Resize-image-project-4.png", caption: "Europcar fleet ready for the road" },
  { img: "https://images.unsplash.com/photo-1546412414-c2658fffe7d9?w=600&h=600&fit=crop", caption: "Sheikh Zayed Road, Dubai" },
  { img: "https://images.unsplash.com/photo-1652707228067-25672fa0b082?w=600&h=600&fit=crop", caption: "Dubai Marina by night" },
  { img: "https://images.unsplash.com/photo-1631603995254-a4d858b652c4?w=600&h=600&fit=crop", caption: "Dubai streets and skyline" },
  { img: "https://images.unsplash.com/photo-1459787915554-b34915863013?w=600&h=600&fit=crop", caption: "Aerial view of Dubai" },
];

const videos = [
  { id: "youtube-embed-1", src: "https://www.youtube.com/embed/Q2kHRGYeUcQ?rel=0&modestbranding=1", title: "Moving Forward with EuroGulf Mobility Group" },
  { id: "youtube-embed-2", src: "https://www.youtube.com/embed/KiCi2eo3PuE?rel=0&modestbranding=1", title: "It's not just a fleet. It's the scale and innovation of Eurogulf Mobility Group" },
];

function SocialButton({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all">
      {children}
    </a>
  );
}

export function FeaturedSocials() {
  return (
    <section data-testid="featured-socials" className="bg-[#0a0a0a] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="orange-accent-line mx-auto mb-6" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">What's Happening at Eurogulf Mobility Group</h2>
          <p className="font-body text-[#666]">Stories from across our brands and community</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {featuredStories.map((s) => (
            <div key={s.badge} className="bg-[#111] border border-white/5 overflow-hidden group hover:border-[#EE5A01]/30 transition-all">
              <div className={`h-48 bg-gradient-to-br flex items-center justify-center ${s.badgeCls}`}>
                <span className="font-heading font-black text-5xl">{s.badge}</span>
              </div>
              <div className="p-6">
                <span className="font-mono text-[10px] text-[#EE5A01] tracking-wider uppercase">{s.tag}</span>
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mt-2 mb-2">{s.title}</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <InstagramPosts />
        <div data-testid="instagram-embed" className="max-w-md mx-auto mb-10">
          <div className="bg-[#111] border border-white/5 p-6 text-center">
            <p className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase mb-4">Latest from Instagram</p>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="block">
              <div className="aspect-square bg-gradient-to-br from-[#EE5A01]/5 to-[#111] border border-white/5 flex flex-col items-center justify-center gap-3 hover:border-[#EE5A01]/30 transition-all">
                <span className="font-heading font-black text-2xl text-[#EEEDE7]">@eurogulfmobility</span>
                <span className="font-body text-xs text-[#666]">Follow us for the latest updates, fleet news, and behind-the-scenes content from across the UAE.</span>
                <span className="inline-flex items-center gap-2 mt-2 font-heading font-bold text-xs text-[#EE5A01] border border-[#EE5A01]/40 px-4 py-2 hover:bg-[#EE5A01] hover:text-black transition-all">VIEW ON INSTAGRAM</span>
              </div>
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <SocialButton href={INSTAGRAM}>FOLLOW ON INSTAGRAM</SocialButton>
          <SocialButton href={LINKEDIN}>FOLLOW ON LINKEDIN</SocialButton>
        </div>
      </div>
    </section>
  );
}

export function VideosGallery() {
  return (
    <section data-testid="social-section" className="bg-black py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] mb-4 uppercase">See Us in Action</p>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#EEEDE7]">@eurogulfmobility</h2>
        </div>

        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {videos.map((v) => (
            <div key={v.id} className="relative w-full overflow-hidden border border-white/5 rounded-sm" style={{ paddingBottom: '177%' }}>
              <iframe data-testid={v.id} src={v.src} title={v.title} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {socialImages.map((item) => (
            <a key={item.caption} href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="relative aspect-square overflow-hidden group">
              <img src={item.img} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end justify-start p-3">
                <p className="font-body text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{item.caption}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <SocialButton href={INSTAGRAM}>INSTAGRAM</SocialButton>
          <SocialButton href={YOUTUBE}>YOUTUBE</SocialButton>
          <SocialButton href={LINKEDIN}>LINKEDIN</SocialButton>
          <SocialButton href={FACEBOOK}>FACEBOOK</SocialButton>
        </div>
      </div>
    </section>
  );
}
