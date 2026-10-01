'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { event, faqs, gallery, inspirations, journey } from '@/lib/event';

gsap.registerPlugin(ScrollTrigger);

function PixelStar({ className = '' }: { className?: string }) {
  return <svg aria-hidden="true" className={`pixel-star ${className}`} viewBox="0 0 32 32"><path fill="currentColor" d="M14 0h4v8h4v4h4v2h6v4h-6v2h-4v4h-4v8h-4v-8h-4v-4H6v-2H0v-4h6v-2h4V8h4z" /></svg>;
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>[ {number} ]</span><span>{children}</span><span className="label-cross">+</span></div>;
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const lenis = useRef<Lenis | null>(null);
  const registrationDialog = useRef<HTMLDialogElement>(null);
  const galleryDialog = useRef<HTMLDialogElement>(null);
  const [activeIdea, setActiveIdea] = useState(0);
  const [photo, setPhoto] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chapter, setChapter] = useState('01');
  const [motionPaused, setMotionPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ticker: ((time: number) => void) | undefined;
    if (!reduced && !motionPaused) {
      const smooth = new Lenis({ duration: 1.1, smoothWheel: true, syncTouch: false });
      lenis.current = smooth;
      smooth.on('scroll', ScrollTrigger.update);
      ticker = (time) => smooth.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      ScrollTrigger.create({ trigger: root.current, start: 'top top', end: () => ScrollTrigger.maxScroll(window), refreshPriority: -20, onUpdate: self => gsap.set('.progress-fill', { scaleX: self.progress }) });
      document.querySelectorAll<HTMLElement>('[data-chapter]').forEach(section => {
        ScrollTrigger.create({ trigger: section, start: 'top center', end: 'bottom center', onEnter: () => setChapter(section.dataset.chapter!), onEnterBack: () => setChapter(section.dataset.chapter!) });
      });

      if (!reduced && !motionPaused) {
        gsap.from('.hero-title span', { yPercent: 105, duration: 1, ease: 'power3.out', stagger: 0.035, delay: 0.08 });
        gsap.from('.hero-art', { y: 65, opacity: 0, rotate: -7, duration: 1.1, ease: 'power3.out', delay: 0.2 });
        gsap.from('.hero-intro, .hero-date, .hero-bottom', { y: 20, opacity: 0, duration: 0.65, stagger: 0.08, delay: 0.5, ease: 'power3.out' });

        media.add('(min-width: 1000px) and (min-height: 650px)', () => {
          const pin = (id: string, end: string) => ({ id: `scene-${id}`, trigger: `#${id}`, start: 'top top', end, pin: true, scrub: 0.75, anticipatePin: 1, invalidateOnRefresh: true });
          gsap.timeline({ scrollTrigger: pin('home', '+=65%') })
            .to('.hero-art', { y: -70, rotate: 6, scale: 1.05, ease: 'power1.inOut' }, 0)
            .to('.orbit', { rotate: 35, ease: 'power1.inOut' }, 0)
            .to('.hero-title', { y: -35, opacity: 0.35, ease: 'power1.inOut' }, 0)
            .to('.hero-sticker', { rotate: 10, x: 35, ease: 'power1.inOut' }, 0);
          gsap.timeline({ scrollTrigger: pin('about', '+=75%') })
            .from('.manifesto-line', { y: 70, opacity: 0.15, stagger: 0.2, ease: 'power2.out', duration: 0.7 })
            .from('.about-copy', { y: 35, opacity: 0, duration: 0.4 }, 0.5)
            .to('.about-symbol', { rotate: 90, scale: 1.15, ease: 'power1.inOut', duration: 1 }, 0);
          gsap.timeline({ scrollTrigger: pin('prizes', '+=60%') })
            .from('.prize-digit', { yPercent: 65, opacity: 0.2, stagger: 0.055, ease: 'power2.out', duration: 0.5 })
            .from('.prize-bottom', { y: 25, opacity: 0, duration: 0.4 }, 0.4)
            .to('.prize-stamp', { rotate: -20, ease: 'power1.inOut', duration: 1 }, 0);
          gsap.timeline({ scrollTrigger: pin('challenge', '+=45%') })
            .from('.challenge-heading', { y: 50, opacity: 0.2, ease: 'power2.out' })
            .from('.idea-tabs, .idea-panel', { y: 40, opacity: 0, stagger: 0.15, ease: 'power2.out' }, 0.15);
          gsap.timeline({ scrollTrigger: pin('journey', '+=90%') })
            .from('.journey-card', { x: 50, opacity: 0.1, stagger: 0.35, duration: 0.5, ease: 'power2.out' })
            .to('.journey-number', { rotate: -8, scale: 0.94, ease: 'power1.inOut', duration: 1.3 }, 0);
          const track = document.querySelector<HTMLElement>('.gallery-track')!;
          const viewport = document.querySelector<HTMLElement>('.gallery-window')!;
          gsap.to(track, { x: () => -(track.scrollWidth - viewport.clientWidth), ease: 'none', scrollTrigger: { ...pin('gallery', '+=100%'), end: () => `+=${Math.max(700, track.scrollWidth - viewport.clientWidth)}`, snap: { snapTo: 1 / (gallery.length - 1), duration: { min: 0.15, max: 0.45 }, delay: 0.18, directional: true } } });
        });
        media.add('(max-width: 999px), (max-height: 649px)', () => {
          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => gsap.from(el, { y: 25, opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
        });
        gsap.from('.fish-copy, .terminal', { y: 40, opacity: 0, stagger: 0.1, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: '#tinyfish', start: 'top 75%', once: true } });
      }
      // Pinning changes all downstream offsets; recalculate after all scenes exist.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, root);
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => { media.revert(); context.revert(); if (ticker) gsap.ticker.remove(ticker); lenis.current?.destroy(); lenis.current = null; };
  }, [motionPaused]);

  const navigate = useCallback((id: string) => {
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (!section) return;
    const scene = ScrollTrigger.getById(`scene-${id}`);
    const position = scene ? scene.start + (id === 'home' || id === 'gallery' ? 1 : (scene.end - scene.start) * 0.9) : window.scrollY + section.getBoundingClientRect().top - 78;
    if (lenis.current) lenis.current.scrollTo(position, { duration: 1.25 });
    else window.scrollTo({ top: Math.max(0, position), behavior: 'instant' });
  }, []);

  const openRegistration = () => {
    if (event.registrationUrl) { window.open(event.registrationUrl, '_blank', 'noopener,noreferrer'); return; }
    registrationDialog.current?.showModal();
    lenis.current?.stop();
  };

  useEffect(() => {
    if (photo !== null && !galleryDialog.current?.open) { galleryDialog.current?.showModal(); lenis.current?.stop(); }
  }, [photo]);

  const closePhoto = () => { galleryDialog.current?.close(); setPhoto(null); lenis.current?.start(); };
  const changePhoto = (step: number) => setPhoto(current => current === null ? 0 : (current + step + gallery.length) % gallery.length);

  return (
    <main ref={root}>
      <a className="skip-link" href="#about">Skip to event details</a>
      <header className="header">
        <button className="brand" onClick={() => navigate('home')} aria-label="AZINHACK home"><PixelStar /><span className="brand-word">AZIN<span className="brand-hack">HACK</span><span className="brand-year">’26</span></span></button>
        <nav id="mobile-nav" className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Main navigation">
          {['About', 'Challenge', 'Journey', 'Gallery'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={e => { e.preventDefault(); navigate(item.toLowerCase()); }}>{item}</a>)}
        </nav>
        <button className="header-cta" onClick={openRegistration}>{event.registrationUrl ? 'Register now' : 'Join the build'}<span className="button-pixel" aria-hidden="true">✳</span></button>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? '−' : '+'}</button>
      </header>
      <div className="scroll-progress" aria-hidden="true"><div className="progress-fill" /></div>

      <section className="hero scene dot-grid" id="home" data-chapter="01">
        <div className="hero-top mono"><span>IoSC × GGSIPU USAR PRESENTS</span><span>A NATIONAL HACKATHON</span></div>
        <h1 className="hero-title" aria-label="AZINHACK ’26">{'AZINHACK'.split('').map((letter, index) => <span className={index >= 4 ? 'hack-letter' : undefined} aria-hidden="true" key={index}>{letter}</span>)}<sup>’26</sup></h1>
        <div className="hero-intro"><p className="eyebrow"><span className="square-mark" /> IDEAS INTO REALITY</p><h2>Your next big thing<br />starts with a <i>what if.</i></h2><p>24 hours to turn curiosity into code.<br />One open brief. A world of possibility.</p><button className="button button-blue" onClick={openRegistration}>{event.registrationUrl ? 'Register for AZINHACK' : 'Join the build'}<PixelStar /></button><span className="registration-note">Registration details coming soon</span></div>
        <div className="hero-art-wrap"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><Image className="hero-art" src="/art/hand-star.webp" alt="A halftone hand reaching toward an electric-blue star." width={1254} height={1254} priority /><span className="art-coordinate mono">FIG. 01 — THE SPARK</span></div>
        <div className="hero-date"><span className="mono">SAVE THE DATE</span><strong>21—22</strong><span className="date-month">OCTOBER 2026</span><a href="/azinhack-26.ics" download className="text-link">Add to calendar <span aria-hidden="true">+</span></a></div>
        <div className="hero-sticker"><span>24 HOURS</span><PixelStar /><span>MAKE IT REAL</span></div>
        <div className="hero-bottom mono"><span>GGSIPU USAR<br />EAST DELHI CAMPUS</span><button onClick={() => navigate('about')} className="scroll-cue"><span className="scroll-mouse" />SCROLL TO EXPLORE</button><span>OPEN INNOVATION<br />POWERED BY <span className="tinyfish-reference">TINYFISH</span></span></div>
      </section>

      <div className="ticker" aria-hidden="true"><div className="ticker-track"><span>THINK BIG</span><PixelStar /><span>BUILD SOMETHING REAL</span><PixelStar /><span>BREAK THE ORDINARY</span><PixelStar /><span>THINK BIG</span><PixelStar /><span>BUILD SOMETHING REAL</span><PixelStar /><span>BREAK THE ORDINARY</span><PixelStar /></div></div>

      <section className="about scene" id="about" data-chapter="02">
        <SectionLabel number="01">THE IDEA BEHIND IT ALL</SectionLabel>
        <div className="manifesto" data-reveal><h2><span className="manifesto-line">YOUR <i>WHAT IF.</i></span><span className="manifesto-line">OUR <i>WHY NOT.</i></span></h2></div>
        <div className="about-bottom"><PixelStar className="about-symbol" /><div className="about-copy" data-reveal><p>Some ideas deserve more than a note on your phone.</p><p>AZINHACK brings curious builders together for an overnight sprint of problem solving, collaboration, and making things happen. Take a problem you care about. Leave with a prototype worth keeping.</p><div className="about-facts mono"><span>24 HOURS</span><span>OPEN INNOVATION</span><span>ONE COMMUNITY</span></div></div></div>
        <div className="frame-corner corner-left" /><div className="frame-corner corner-right" />
      </section>

      <section className="prizes scene dot-grid" id="prizes" data-chapter="03">
        <SectionLabel number="02">BIG IDEAS. REAL REWARDS.</SectionLabel>
        <div className="prize-top"><h2>Make it count.</h2><span className="mono">TOTAL PRIZE POOL</span></div>
        <div className="prize-amount" role="img" aria-label="Total prize pool: 1 lakh rupees" data-reveal><span className="rupee" aria-hidden="true">₹</span>{'1,00,000'.split('').map((digit, i) => <span className="prize-digit" aria-hidden="true" key={i}>{digit}</span>)}</div>
        <div className="prize-bottom"><div><h3>For the ideas that go somewhere.</h3><p>Build with purpose. Show what works.<br />Final prize distribution to be announced.</p></div><div className="prize-stamp"><PixelStar /><span className="mono">BUILT WITH<br />POSSIBILITY</span></div><span className="prize-code mono">REWARD_PROTOCOL<br />AZINHACK_2026</span></div>
      </section>

      <section className="challenge scene" id="challenge" data-chapter="04">
        <SectionLabel number="03">THE BUILD BRIEF</SectionLabel>
        <div className="challenge-layout"><div className="challenge-heading" data-reveal><span className="tag">OPEN INNOVATION</span><h2>ONE TRACK.<br />EVERY<br /><i>POSSIBILITY.</i></h2><p>The problem is yours to choose.<br />The next step is yours to build.</p><div className="challenge-requirement mono"><PixelStar /><span>EVERY PROJECT<br />INTEGRATES <span className="tinyfish-reference">TINYFISH</span></span></div></div><div className="idea-explorer" data-reveal><p className="eyebrow">A FEW PLACES TO START</p><div className="idea-tabs" role="tablist" aria-label="Open Innovation inspiration">{inspirations.map((idea, i) => <button key={idea.code} id={`idea-tab-${i}`} role="tab" aria-selected={i === activeIdea} aria-controls="idea-panel" tabIndex={i === activeIdea ? 0 : -1} onClick={() => setActiveIdea(i)} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + inspirations.length) % inspirations.length; setActiveIdea(next); document.getElementById(`idea-tab-${next}`)?.focus(); } }}><span>{idea.code}</span>{idea.name}</button>)}</div><div className="idea-panel" id="idea-panel" role="tabpanel" aria-labelledby={`idea-tab-${activeIdea}`} key={activeIdea}><div className="idea-graphic"><PixelStar /><span className="mono">POSSIBILITY_{inspirations[activeIdea].code}</span></div><h3>{inspirations[activeIdea].title}</h3><p>{inspirations[activeIdea].text}</p><div className="idea-example">{inspirations[activeIdea].idea}</div></div><p className="idea-note mono">INSPIRATION, NOT SEPARATE COMPETITION TRACKS.</p></div></div>
      </section>

      <section className="journey scene" id="journey" data-chapter="05">
        <SectionLabel number="04">FROM FIRST THOUGHT TO FINAL DEMO</SectionLabel>
        <div className="journey-layout"><div className="journey-heading" data-reveal><h2>A DAY TO<br /><i>MAKE YOURS.</i></h2><div className="journey-number">24<span>HRS</span></div><p>21–22 OCTOBER 2026</p><span className="schedule-note mono">DETAILED SCHEDULE COMING SOON</span></div><div className="journey-cards">{journey.map(item => <article className="journey-card" key={item.phase} data-reveal><div className="journey-card-top mono"><span>{item.phase}</span><PixelStar /></div><h3>{item.title}</h3><p>{item.text}</p><span className="journey-tags mono">{item.tags}</span></article>)}</div></div>
      </section>

      <section className="tinyfish" id="tinyfish" data-chapter="05">
        <SectionLabel number="05">TITLE SPONSOR & BUILD PARTNER</SectionLabel>
        <div className="fish-layout"><div className="fish-copy"><span className="fish-name">TinyFish<span className="fish-dot">®</span></span><h2>A BIG IDEA.<br />A <i>TINY FISH.</i></h2><p>Give your idea a connection to the live web. Discover information, read pages, or automate a useful website workflow.</p><p className="fish-requirement">Every AZINHACK project must integrate TinyFish.</p><a className="button button-dark" href="https://docs.tinyfish.ai/quick-start" target="_blank" rel="noopener noreferrer">Explore the quick start<PixelStar /></a></div><div className="terminal"><div className="terminal-bar mono"><span><i /><i /><i /></span><span>IDEA_TO_REALITY.ts</span><span>+</span></div><div className="terminal-body"><p className="terminal-comment">// good ideas need real-world input</p><p><span className="code-blue">const</span> problem = <span className="code-green">"something that matters"</span>;</p><p><span className="code-blue">const</span> possibility = <span className="code-green">"the live web"</span>;</p><p className="terminal-spacer"><span className="code-blue">build</span>({'{'}<br />&nbsp; yourIdea,<br />&nbsp; <span className="code-green">tinyfish</span><br />{'}'});</p><p className="terminal-comment">// make something worth showing<span className="terminal-cursor">▋</span></p></div><div className="terminal-resources mono"><a href="https://docs.tinyfish.ai/" target="_blank" rel="noopener noreferrer">DOCUMENTATION</a><a href="https://github.com/tinyfish-io/tinyfish-cookbook" target="_blank" rel="noopener noreferrer">COOKBOOK</a></div></div></div>
      </section>

      <section className="gallery-section scene" id="gallery" data-chapter="06">
        <SectionLabel number="06">FROM THE COMMUNITY</SectionLabel>
        <div className="gallery-heading"><h2>GOOD PEOPLE.<br /><i>GREAT POSSIBILITIES.</i></h2><span className="mono">THE COMMUNITY ARCHIVE<br />SCROLL. EXPLORE. REMEMBER.</span></div>
        <div className="gallery-window" data-lenis-prevent><div className="gallery-track">{gallery.map((item, i) => <button className="photo-card" key={item.src} onClick={() => setPhoto(i)} aria-label={`Open photo ${i + 1}: ${item.alt}`}><div className="photo-image"><Image src={item.src} alt={item.alt} width={1600} height={1200} sizes="(max-width: 700px) 85vw, 48vw" /><span className="photo-expand" aria-hidden="true">+</span></div><div className="photo-caption"><span className="mono">FRAME_0{i + 1}</span><span>{item.caption}</span></div></button>)}</div></div>
        <div className="gallery-bottom mono"><span>THE PEOPLE BEHIND THE POSSIBILITY.</span><span>CLICK A FRAME TO TAKE A CLOSER LOOK</span></div>
      </section>

      <section className="faq-section" id="faq" data-chapter="07"><SectionLabel number="07">BEFORE YOU BUILD</SectionLabel><div className="faq-layout"><div><h2>GOOD<br /><i>QUESTIONS.</i></h2><p>A few things to know<br />before the first line of code.</p></div><div className="faq-list">{faqs.map((item, i) => <details key={item.q}><summary><span className="faq-index mono">0{i + 1}</span><span>{item.q}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div></section>

      <footer><div className="footer-top"><div><span className="mono">21–22 OCTOBER · GGSIPU USAR</span><h2>GOT A <i>WHAT IF?</i><br />LET’S BUILD IT.</h2></div><button className="button button-lime" onClick={openRegistration}>{event.registrationUrl ? 'Register now' : 'Join the build'}<PixelStar /></button></div><div className="footer-word" aria-hidden="true">AZIN<span className="footer-hack">HACK</span><span>’26</span></div><div className="footer-bottom mono"><span>ORGANIZED BY IoSC<br />INTEL oneAPI STUDENT CLUB · GGSIPU EDC</span><a href="/azinhack-26.ics" download>SAVE THE DATE</a><button className="motion-control" aria-pressed={motionPaused} onClick={() => setMotionPaused(!motionPaused)}>{motionPaused ? 'ENABLE MOTION' : 'PAUSE MOTION'}</button><button onClick={() => navigate('home')}>BACK TO TOP +</button></div></footer>
      <div className="chapter-indicator mono" aria-hidden="true"><span>{chapter}</span><span>/ 07</span></div>

      <dialog ref={registrationDialog} className="registration-dialog" aria-label="AZINHACK registration details" onClose={() => lenis.current?.start()} onClick={e => { if (e.target === e.currentTarget) registrationDialog.current?.close(); }}><button className="dialog-close" aria-label="Close registration details" onClick={() => registrationDialog.current?.close()}>×</button><PixelStar /><span className="eyebrow">YOU’RE EARLY. WE LIKE THAT.</span><h2>Your next build<br />is almost here.</h2><p>Registration details for AZINHACK ’26 will be announced soon. Save the date and explore the build brief while we get things ready.</p><div className="dialog-event"><strong>21–22 October 2026</strong><span>{event.venue}</span></div><a href="/azinhack-26.ics" download className="button button-blue">Save the date<PixelStar /></a><button className="text-link" onClick={() => { registrationDialog.current?.close(); lenis.current?.start(); navigate('challenge'); }}>Explore the challenge +</button></dialog>
      <dialog ref={galleryDialog} className="gallery-dialog" aria-label="Community photo viewer" data-lenis-prevent onCancel={e => { e.preventDefault(); closePhoto(); }} onClose={() => { setPhoto(null); lenis.current?.start(); }} onClick={e => { if (e.target === e.currentTarget) closePhoto(); }} onKeyDown={e => { if (e.key === 'ArrowRight') changePhoto(1); if (e.key === 'ArrowLeft') changePhoto(-1); }}><button className="dialog-close" onClick={closePhoto} aria-label="Close photo viewer">×</button>{photo !== null && <><Image src={gallery[photo].src} alt={gallery[photo].alt} width={1600} height={1200} sizes="95vw" /><div className="viewer-bottom"><button onClick={() => changePhoto(-1)} aria-label="Previous photo">PREV</button><span>{gallery[photo].caption}<small className="mono">{String(photo + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</small></span><button onClick={() => changePhoto(1)} aria-label="Next photo">NEXT</button></div></>}</dialog>
    </main>
  );
}
