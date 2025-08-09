import { Component } from '@angular/core';
@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class Hero {
  hoveredArcId: string | null = null;

  stats = [
    { value: '50B+', label: 'Square Feet Tracked' },
    { value: '180+', label: 'Countries Covered' },
    { value: '98%', label: 'Data Accuracy' },
  ];

  onHover(arcId: string | null): void {
    this.hoveredArcId = arcId;
  }
}
