import {
  AfterViewInit,
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
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  isScrolled = false;
  menuOpen = false;
  isMobile = false;
  showPhoto = false;
  activeSection = 'home';

  readonly monitoringShots = monitoringGallery;
  monitoringIndex = 0;
  readonly proviewShots = proviewGallery;
  proviewIndex = 0;
  readonly profitShots = profitGallery;
  profitIndex = 0;
  readonly ipforkShots = ipforkGallery;
  ipforkIndex = 0;

  email = 'vishwakarmaakanshu@gmail.com';
  emailAlt = 'aanshuvish@gmail.com';
  phone = '+91-8429245754';
  whatsapp = '+91-7049898326';
  location = 'Hyderabad, India';
  linkedin = 'https://www.linkedin.com/in/akanshu-vishwakarma-ba810b17b';
  github = 'https://github.com/vishwakarmaakanshu-cpu';

  constructor() {
    this.isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
  }

  ngAfterViewInit(): void {
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
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

  hideImage(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.style.display = 'none';
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
