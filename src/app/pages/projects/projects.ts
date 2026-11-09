import { Component } from '@angular/core';
import { ipforkShots as ipforkGallery, monitoringShots as monitoringGallery, profitShots as profitGallery, proviewShots as proviewGallery } from '../../work-shots';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html'
})
export class ProjectsPage {
  readonly monitoringShots = monitoringGallery;
  monitoringIndex = 0;
  readonly proviewShots = proviewGallery;
  proviewIndex = 0;
  readonly profitShots = profitGallery;
  profitIndex = 0;
  readonly ipforkShots = ipforkGallery;
  ipforkIndex = 0;

  hideImage(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.style.display = 'none';
  }
}
