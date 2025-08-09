import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  signal,
  computed,
  ChangeDetectorRef,
} from '@angular/core';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  desc: string;
  badge: string; // logo image src
}

@Component({
  selector: 'app-leading-companies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative py-16 sm:py-20 bg-black overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section title -->
        <div class="text-center mb-10 sm:mb-14">
          <p
            class="text-xs sm:text-sm tracking-widest text-teal-300 uppercase mb-2 font-sans"
          >
            Customer Results
          </p>
          <h2
            class="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-white mb-1"
          >
            Leading Companies Trust Measurabl
          </h2>
          <p
            class="text-[10px] sm:text-xs tracking-wider text-gray-300 uppercase"
          >
            Over 1000 companies worldwide rely on Measurabl
          </p>
        </div>

        <!-- Logos marquee scrolling -->
        <div class="overflow-hidden mb-12">
          <div class="flex flex-col gap-4">
            <!-- Row 1 -->
            <div class="flex gap-6 animate-marquee whitespace-nowrap">
              @for (logo of allLogos(); track $index) {
              <img
                [src]="logo"
                alt="Company logo"
                class="inline-block rounded-full h-10 sm:h-12 px-5 sm:px-7 py-1.5 sm:py-2 shadow-lg object-contain mx-2 transition-transform duration-300 hover:scale-110"
              />
              }
            </div>

            <!-- Row 2 -->
            <div class="flex gap-6 animate-marquee-reverse whitespace-nowrap">
              @for (logo of allLogos(); track $index) {
              <img
                [src]="logo"
                alt="Company logo"
                class="inline-block rounded-full h-10 sm:h-12 px-5 sm:px-7 py-1.5 sm:py-2 shadow-lg object-contain mx-2 transition-transform duration-300 hover:scale-110"
              />
              }
            </div>
          </div>
        </div>

        <!-- Stats Bar -->
        <div
          #statsSection
          class="relative mt-10 sm:mt-12 py-6 sm:py-8 px-3 sm:px-6 md:px-10 max-w-5xl mx-auto"
        >
          <!-- Corner borders -->
          <div
            class="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-teal-400 rounded-tl-xl"
          ></div>
          <div
            class="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-r-2 border-teal-400 rounded-tr-xl"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-l-2 border-teal-400 rounded-bl-xl"
          ></div>
          <div
            class="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-teal-400 rounded-br-xl"
          ></div>

          <!-- Grid -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center relative z-10"
          >
            @for (stat of stats(); track $index) {
            <div>
              <div class="flex justify-center mb-2">
                <img
                  [src]="stat.badge"
                  alt=""
                  class="rounded-full h-7 sm:h-8 px-2 sm:px-3 py-1 object-contain shadow"
                />
              </div>
              <div
                class="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-baseline justify-center gap-0.5"
                style="min-height:2.5rem"
              >
                @if (stat.suffix) {
                {{ animatedValues()[$index]
                }}<span class="text-sm sm:text-lg">{{ stat.suffix }}</span>
                } @else {
                {{ animatedValues()[$index] }}
                }
              </div>
              <div
                class="text-[10px] sm:text-xs text-gray-300 uppercase mt-2 tracking-wider"
                [innerHTML]="stat.desc"
              ></div>
            </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      @keyframes marquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      @keyframes marquee-reverse {
        0% {
          transform: translateX(-50%);
        }
        100% {
          transform: translateX(0);
        }
      }
      .animate-marquee {
        animation: marquee 15s linear infinite;
      }
      .animate-marquee-reverse {
        animation: marquee-reverse 15s linear infinite;
      }
      @media (max-width: 600px) {
        img[alt='Company logo'] {
          height: 38px !important;
          padding: 3px 14px !important;
        }
        .grid-cols-4 {
          grid-template-columns: 1fr !important;
        }
      }
    `,
  ],
})
export class LeadingCompaniesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('statsSection') statsSection!: ElementRef<HTMLDivElement>;

  private animated = false;
  private observer?: IntersectionObserver;
  private animationFrameIds: number[] = [];

  // Signals for reactive state management
  private currentValues = signal<number[]>([0, 0, 0, 0]);

  // Company logos as signal
  private companyLogos = signal([
    './Measurabl/imgi_16_diligence.png',
    './Measurabl/imgi_17_optimize.png',
    './Measurabl/imgi_19_logo-17.png',
    './Measurabl/imgi_20_logo-16.png',
    './Measurabl/imgi_21_logo-27.png',
    './Measurabl/imgi_22_logo-26.png',
    './Measurabl/imgi_23_logo-25.png',
    './Measurabl/imgi_24_logo-21.png',
    './Measurabl/imgi_25_logo-20.png',
    './Measurabl/imgi_26_logo-19.png',
    './Measurabl/imgi_27_logo-18.png',
    './Measurabl/imgi_28_logo-7.png',
    './Measurabl/imgi_29_logo-6.png',
    './Measurabl/imgi_30_logo-14.png',
    './Measurabl/imgi_31_logo-13.png',
    './Measurabl/imgi_32_logo-12.png',
    './Measurabl/imgi_33_logo-11.png',
    './Measurabl/imgi_34_logo-10.png',
    './Measurabl/imgi_35_logo-9.png',
  ]);

  // Stats data as signal
  private statsData = signal<Stat[]>([
    {
      value: 1.7,
      suffix: 'M',
      label: 'Annual Energy Savings',
      desc: 'REDUCED ANNUAL ENERGY EXPENSES',
      badge: './Measurabl/imgi_22_logo-26.png',
    },
    {
      value: 800,
      suffix: '+',
      label: 'LEED-Certified Assets',
      desc: 'LEED-CERTIFIED ASSETS USING DATA<br>IN MEASURABL',
      badge: './Measurabl/imgi_27_logo-18.png',
    },
    {
      value: 6.7,
      suffix: '%',
      label: 'Annual Savings',
      desc: 'ANNUAL, NO-COST SAVINGS AT<br>MARQUEE PROPERTY',
      badge: './Measurabl/imgi_30_logo-14.png',
    },
    {
      value: 2,
      suffix: ' Years',
      label: 'Ahead in Carbon Goal',
      desc: 'AHEAD IN ACHIEVING 2020 CARBON<br>REDUCTION GOAL',
      badge: './Measurabl/imgi_19_logo-17.png',
    },
  ]);

  // Computed signals
  allLogos = computed(() => {
    const logos = this.companyLogos();
    return [...logos, ...logos];
  });

  stats = computed(() => this.statsData());

  animatedValues = computed(() => {
    const values = this.currentValues();
    const statsArray = this.statsData();

    return values.map((value, index) => {
      const stat = statsArray[index];
      if (!stat) return '0';

      const isDecimal = typeof stat.value === 'number' && stat.value % 1 !== 0;
      return isDecimal ? value.toFixed(1) : Math.floor(value).toLocaleString();
    });
  });

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Use Promise.resolve() to ensure we're in the next microtask
    // This guarantees we're outside the current change detection cycle
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
    // graceful check for IntersectionObserver availability
    if (typeof IntersectionObserver === 'undefined') {
      // If unavailable, show all final counts immediately
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
      { threshold: 0.35 }
    );

    this.observer.observe(this.statsSection.nativeElement);
  }

  private startAnimations() {
    const stats = this.statsData();
    stats.forEach((stat, index) => {
      this.animateNumber(index, stat.value, 1200 + index * 120);
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
}
