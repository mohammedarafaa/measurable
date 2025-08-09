import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  signal,
  computed,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  desc: string;
}

@Component({
  selector: 'app-global-impact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-impact.html',
})
export class GlobalImpact implements AfterViewInit, OnDestroy {
  @ViewChild('statsSection') statsSection!: ElementRef<HTMLElement>;
  
  private animated = false;
  private observer?: IntersectionObserver;
  private animationFrameIds: number[] = [];
  private isBrowser: boolean;

  // Signals for reactive state management
  private currentValues = signal<number[]>([0, 0, 0, 0, 0, 0, 0]);

  // Stats data as signal
  private statsData = signal<Stat[]>([
    {
      label: 'Asset Value',
      value: 3,
      suffix: 'T',
      desc: 'ASSET VALUE',
    },
    {
      label: 'MTCO2e Tracked',
      value: 273,
      suffix: 'M',
      desc: 'MTCO2E TRACKED',
    },
    {
      label: 'Years of Leadership',
      value: 13,
      desc: 'YEARS OF LEADERSHIP',
    },
    {
      label: 'Utility Bills Processed Annually',
      value: 2.5,
      suffix: 'M',
      desc: 'UTILITY BILLS PROCESSED ANNUALLY',
    },
    { 
      label: 'Customers', 
      value: 1000, 
      desc: 'CUSTOMERS' 
    },
    {
      label: 'Measurabl Countries',
      value: 90,
      suffix: '+',
      desc: 'MEASURABL COUNTRIES',
    },
    {
      label: 'Total Sq Feet of Real Estate Managed',
      value: 21,
      suffix: 'B',
      desc: 'TOTAL SQ FEET OF REAL ESTATE MANAGED',
    },
  ]);

  // Computed signals
  stats = computed(() => {
    const statsArray = this.statsData();
    const values = this.currentValues();
    
    return statsArray.map((stat, index) => ({
      ...stat,
      display: this.formatDisplayValue(values[index], stat)
    }));
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) {
      // Set final values immediately for server-side rendering
      const finalValues = this.statsData().map((stat) => stat.value);
      this.currentValues.set(finalValues);
      return;
    }

    // Use Promise.resolve() to ensure we're in the next microtask
    Promise.resolve().then(() => {
      this.setupIntersectionObserver();
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    // Cancel any ongoing animations
    this.animationFrameIds.forEach((id) => cancelAnimationFrame(id));
  }

  private setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: show final values immediately
      const finalValues = this.statsData().map((stat) => stat.value);
      this.currentValues.set(finalValues);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !this.animated) {
          this.animated = true;
          // Use Promise.resolve() to ensure animations start in next microtask
          Promise.resolve().then(() => {
            this.startAnimations();
          });
          this.observer?.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    this.observer.observe(this.statsSection.nativeElement);
  }

  private startAnimations() {
    const stats = this.statsData();
    stats.forEach((stat, index) => {
      this.animateNumber(index, stat.value, 1200 + index * 100);
    });
  }

  private animateNumber(index: number, targetValue: number, duration: number) {
    const start = 0;
    const end = targetValue;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = start + (end - start) * progress;

      // Update the signal with new values
      this.currentValues.update((values) => {
        const newValues = [...values];
        newValues[index] = current;
        return newValues;
      });

      if (progress < 1) {
        const frameId = requestAnimationFrame(animate);
        this.animationFrameIds.push(frameId);
      } else {
        // Ensure final value is exact
        this.currentValues.update((values) => {
          const newValues = [...values];
          newValues[index] = end;
          return newValues;
        });
      }
    };

    const frameId = requestAnimationFrame(animate);
    this.animationFrameIds.push(frameId);
  }

  private formatDisplayValue(value: number, stat: Stat): string {
    const isDecimal = stat.suffix === 'M' && stat.value !== Math.floor(stat.value);
    
    if (isDecimal) {
      return value.toFixed(1);
    } else if (stat.suffix === 'T' || stat.suffix === 'B') {
      return value.toFixed(0);
    } else {
      return Math.floor(value).toLocaleString();
    }
  }
}