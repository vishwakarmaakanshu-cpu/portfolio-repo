import { Routes } from '@angular/router';
import { AboutPage } from './pages/about/about';
import { ContactPage } from './pages/contact/contact';
import { DesignsPage } from './pages/designs/designs';
import { ExperiencePage } from './pages/experience/experience';
import { HomePage } from './pages/home/home';
import { ProjectsPage } from './pages/projects/projects';
import { ResumePage } from './pages/resume/resume';
import { SkillsPage } from './pages/skills/skills';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Akanshu Vishwakarma — Software Engineer & UI/UX' },
  { path: 'about', component: AboutPage, title: 'About — Akanshu Vishwakarma' },
  { path: 'experience', component: ExperiencePage, title: 'Experience — Akanshu Vishwakarma' },
  { path: 'skills', component: SkillsPage, title: 'Skills — Akanshu Vishwakarma' },
  { path: 'projects', component: ProjectsPage, title: 'Projects — Akanshu Vishwakarma' },
  { path: 'designs', component: DesignsPage, title: 'UI/UX — Akanshu Vishwakarma' },
  { path: 'resume', component: ResumePage, title: 'Resume — Akanshu Vishwakarma' },
  { path: 'contact', component: ContactPage, title: 'Contact — Akanshu Vishwakarma' },
  { path: '**', redirectTo: '' }
];
