import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html'
})
export class SkillsPage {
  readonly groups = [
    {
      label: 'Frameworks',
      skills: ['Angular', 'React.js', 'Ionic', 'Node.js', 'WordPress']
    },
    {
      label: 'Scripting',
      skills: ['TypeScript', 'JavaScript', 'ECMAScript', 'HTML5', 'CSS3', 'SCSS', 'Less']
    },
    {
      label: 'Libraries',
      skills: ['jQuery', 'Dust.js', 'Bootstrap', 'Material Design', 'Kendo UI', 'NgRx']
    },
    {
      label: 'UX tools',
      skills: ['Figma', 'Adobe Photoshop', 'Canva', 'Wireframing', 'Prototyping', 'UI/UX Design', 'Responsive Design']
    },
    {
      label: 'Other tools',
      skills: ['REST APIs', 'API Integration', 'Git / GitHub', 'Bitbucket', 'Jenkins', 'Jira', 'AWS', 'Firebase', 'Visual Studio', 'Android Studio']
    },
    {
      label: 'Daily tools',
      skills: ['Cursor', 'ChatGPT']
    }
  ];
}
