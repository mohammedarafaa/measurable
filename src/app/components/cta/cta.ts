import { Component } from '@angular/core';

@Component({
  selector: 'app-cta',
  imports: [],
  templateUrl: './cta.html',
  styleUrl: './cta.scss',
})
export class Cta {
  trustIndicators = [
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
    { value: 'SOC 2', label: 'Certified' },
    { value: '30 Day', label: 'Free Trial' },
  ];
}
