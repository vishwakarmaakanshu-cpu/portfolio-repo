import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  inject
} from '@angular/core';
import { ipforkShots as ipforkGallery, monitoringShots as monitoringGallery, profitShots as profitGallery, proviewShots as proviewGallery } from './work-shots';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    '[class.day]': 'dayMode'
  }
})
export class App implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly view = inject(ChangeDetectorRef);

  isScrolled = false;
  menuOpen = false;
  isMobile = false;
  dayMode = false;
  showPhoto = false;
  activeSection = 'home';

  readonly monitoringShots = monitoringGallery;
  monitoringIndex = 0;
  readonly proviewShots = proviewGallery;
  readonly profitShots = profitGallery;
  profitIndex = 0;
  readonly ipforkShots = ipforkGallery;
  ipforkIndex = 0;
  reduceMotion = false;
  faqOpen = 0;
  faqTyped = '';
  faqWriting = false;
  private faqTimer = 0;
  private faqSpeakTimer = 0;
  private faqVoices: SpeechSynthesisVoice[] = [];
  readonly matrixDrops = Array.from({ length: 26 }, (_, index) => {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]';
    const glyphs = Array.from({ length: 52 }, () => ({
      char: alphabet[Math.floor(Math.random() * alphabet.length)],
      size: `${(0.58 + Math.random() * 1.15).toFixed(2)}em`
    }));
    return {
      id: index,
      speed: `${(14 + Math.random() * 32).toFixed(2)}s`,
      delay: `${(-Math.random() * 22).toFixed(2)}s`,
      blur: `${(Math.random() * Math.random() * 5.5).toFixed(2)}px`,
      size: `${(16 + Math.random() * 14).toFixed(1)}px`,
      opacity: (0.55 + Math.random() * 0.45).toFixed(2),
      color: Math.random() > 0.7 ? '#ffd48a' : '#e8a33a',
      left: `${((index + 0.5) / 26) * 100}%`,
      glyphs: [...glyphs, ...glyphs]
    };
  });
  readonly faqs = [
    {
      q: 'Who is Akanshu Vishwakarma?',
      a: 'I am a software engineer and UI/UX developer focused on modern, responsive, and user-friendly web applications. I aim for clean interfaces, solid performance, and a clear path through each screen.'
    },
    {
      q: 'What technologies do you work with?',
      a: 'I work with Angular, React.js, TypeScript, JavaScript, HTML5, CSS3, SCSS, Less, Bootstrap, and Material Design. I design in Figma, Photoshop, and Canva, and I connect the screens to REST APIs.'
    },
    {
      q: 'How much experience do you have?',
      a: 'I have 8 years in web development and UI/UX, since May 2017. That work covers responsive product screens, clean UI, and frontend engineering for operations tools and websites.'
    },
    {
      q: 'Do you take freelance projects?',
      a: 'Yes. I am open to freelance work, collaborations, and longer roles. If you have a product or a screen that needs a clearer interface, send an email.'
    },
    {
      q: 'Can you build custom websites from scratch?',
      a: 'Yes. I design and build custom websites around the brand, the goal, and the people using it, with a responsive layout and a smooth path through the pages.'
    }
  ];

  email = 'vishwakarmaakanshu@gmail.com';
  emailAlt = 'aanshuvish@gmail.com';
  phone = '+91-8429245754';
  whatsapp = '+91-7049898326';
  location = 'Hyderabad, India';
  linkedin = 'https://www.linkedin.com/in/akanshu-vishwakarma-ba810b17b';
  github = 'https://github.com/vishwakarmaakanshu-cpu';

  constructor() {
    this.isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
    if (typeof window !== 'undefined') {
      this.dayMode = localStorage.getItem('theme') === 'day';
      document.documentElement.dataset['theme'] = this.dayMode ? 'day' : 'dark';
      this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const synth = window.speechSynthesis;
      if (synth) {
        const loadVoices = (): void => {
          this.faqVoices = synth.getVoices();
        };
        loadVoices();
        synth.addEventListener('voiceschanged', loadVoices);
      }
    }
  }

  ngAfterViewInit(): void {
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    this.stopFaqPlayback();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 12;
    this.updateActiveSection();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth <= 900;

    if (!this.isMobile && this.menuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  toggleTheme(): void {
    this.dayMode = !this.dayMode;
    localStorage.setItem('theme', this.dayMode ? 'day' : 'dark');
    document.documentElement.dataset['theme'] = this.dayMode ? 'day' : 'dark';
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  closeMenu(): void {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  goTo(id: string, event: Event): void {
    event.preventDefault();
    this.closeMenu();
    this.activeSection = id;

    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    requestAnimationFrame(() => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  toggleFaq(index: number): void {
    const closing = this.faqOpen === index;
    this.stopFaqPlayback();
    if (closing) {
      this.faqOpen = -1;
      return;
    }
    this.faqOpen = index;
    this.writeAndSpeak(this.faqs[index].a);
  }

  faqShown(answer: string): string {
    return this.faqWriting ? this.faqTyped : answer;
  }

  hideImage(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.style.display = 'none';
  }

  frameLabel(index: number, total: number): string {
    return `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  }

  showShot(name: 'monitoring' | 'profit' | 'ipfork', index: number): void {
    this.writeIndex(name, index);
    this.centerThumb(name);
  }

  stepShot(name: 'monitoring' | 'profit' | 'ipfork', delta: number): void {
    const total = this.reelLength(name);
    const next = (this.readIndex(name) + delta + total) % total;
    this.showShot(name, next);
  }

  advanceShot(name: 'monitoring' | 'profit' | 'ipfork', event: AnimationEvent): void {
    if (!event.animationName.endsWith('reel-fill')) {
      return;
    }
    this.stepShot(name, 1);
  }

  private readIndex(name: 'monitoring' | 'profit' | 'ipfork'): number {
    if (name === 'monitoring') return this.monitoringIndex;
    if (name === 'profit') return this.profitIndex;
    return this.ipforkIndex;
  }

  private writeIndex(name: 'monitoring' | 'profit' | 'ipfork', index: number): void {
    if (name === 'monitoring') this.monitoringIndex = index;
    else if (name === 'profit') this.profitIndex = index;
    else this.ipforkIndex = index;
  }

  private reelLength(name: 'monitoring' | 'profit' | 'ipfork'): number {
    if (name === 'monitoring') return this.monitoringShots.length;
    if (name === 'profit') return this.profitShots.length;
    return this.ipforkShots.length;
  }

  private centerThumb(name: 'monitoring' | 'profit' | 'ipfork'): void {
    requestAnimationFrame(() => {
      const reel = this.host.nativeElement.querySelector(`[data-reel="${name}"]`);
      const active = reel?.querySelector('.thumbs button.active') as HTMLElement | null;
      const rail = active?.parentElement;
      if (!active || !rail) {
        return;
      }
      rail.scrollTo({
        left: active.offsetLeft - (rail.clientWidth - active.clientWidth) / 2,
        behavior: this.reduceMotion ? 'auto' : 'smooth'
      });
    });
  }

  private writeAndSpeak(text: string): void {
    this.faqTyped = '';
    this.faqWriting = true;
    let shown = 0;
    let spokenTo = 0;
    const spoken = text.replace(/[./]/g, ' ');

    const paint = (): void => {
      this.faqTyped = text.slice(0, shown);
      if (shown >= text.length) {
        this.faqWriting = false;
        window.clearInterval(this.faqTimer);
      }
      this.view.detectChanges();
    };

    this.faqTimer = window.setInterval(() => {
      if (shown >= spokenTo) {
        return;
      }
      shown += 1;
      paint();
    }, 92);

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      spokenTo = text.length;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(spoken);
    utterance.lang = 'en-IN';
    utterance.rate = 0.84;
    utterance.pitch = 1.16;
    utterance.voice = this.maleVoice();

    const markSpoken = (index: number): void => {
      const nextSpace = spoken.indexOf(' ', Math.max(0, index));
      const next = nextSpace === -1 ? text.length : nextSpace + 1;
      spokenTo = Math.max(spokenTo, next);
    };

    utterance.onstart = () => markSpoken(0);
    utterance.onboundary = (event) => markSpoken(event.charIndex || 0);
    utterance.onend = () => {
      spokenTo = text.length;
    };
    utterance.onerror = () => {
      spokenTo = text.length;
    };

    const synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) {
      synth.cancel();
    }
    synth.resume();
    synth.speak(utterance);

    window.clearTimeout(this.faqSpeakTimer);
    this.faqSpeakTimer = window.setTimeout(() => {
      if (spokenTo === 0 && this.faqOpen >= 0) {
        spokenTo = text.length;
      }
    }, 1400);
  }

  private maleVoice(): SpeechSynthesisVoice | null {
    const voices = this.faqVoices.length ? this.faqVoices : window.speechSynthesis.getVoices();
    const female = /zira|hazel|heera|sonia|susan|samantha|victoria|aria|jenny|natasha|neerja|swara|kalpana|pallavi|female/i;
    const english = voices.filter((voice) => voice.lang.toLowerCase().startsWith('en') && !female.test(voice.name));
    const clearerMale = [/guy/i, /mark/i, /google uk english male/i, /daniel|james|brian|alex/i, /ravi|rishi/i, /george/i, /david|fred|\bmale\b/i];
    for (const pattern of clearerMale) {
      const match = english.find((voice) => pattern.test(voice.name));
      if (match) {
        return match;
      }
    }
    return english[0] ?? null;
  }

  private stopFaqPlayback(): void {
    window.clearInterval(this.faqTimer);
    window.clearTimeout(this.faqSpeakTimer);
    this.faqWriting = false;
    this.faqTyped = '';
    if (typeof window !== 'undefined') {
      window.speechSynthesis?.cancel();
    }
  }

  private updateActiveSection(): void {
    const sections = this.host.nativeElement.querySelectorAll('section[id]');
    const marker = 160;
    let current = 'home';

    sections.forEach((section: Element) => {
      if (section.getBoundingClientRect().top <= marker) {
        current = section.id;
      }
    });

    if (current === 'resume') {
      current = 'designs';
    }

    const page = document.documentElement;
    if (window.innerHeight + window.scrollY >= page.scrollHeight - 8) {
      current = 'contact';
    }

    this.activeSection = current;
  }
}
