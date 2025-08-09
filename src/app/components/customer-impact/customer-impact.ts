import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { SafeUrlPipe } from '../../pipe/safe-url-pipe';
@Component({
  selector: 'app-customer-impact',
  templateUrl: './customer-impact.html',
  imports: [CommonModule, SafeUrlPipe],
  styleUrl: './customer-impact.scss',
})
export class CustomerImpact {
  isOpen = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  getVideoUrl(): string {
    return this.isOpen
      ? 'https://www.youtube.com/embed/ojk2EnBkncI?autoplay=1'
      : '';
  }
}
