import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CarouselItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText?: string;
}

@Component({
  selector: 'app-real-estate-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative bg-[#000] py-20 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-10">
          <p class="text-xs tracking-widest text-teal-300 uppercase mb-2">
            Introducing
          </p>
          <h2
            class="text-2xl md:text-4xl font-serif font-semibold text-white mb-4 leading-tight"
          >
            The World's Most Authoritative Repository Of Aggregated Real Estate
            Data
          </h2>
          <p class="text-gray-300 max-w-3xl mx-auto text-sm leading-relaxed">
            The Measurabl product suite leverages Quantum Cloud data to improve
            disclosure and stakeholder reporting. From portfolio analysis to
            insights into any building anywhere in the world, you get more
            accurate data for where you are in your sustainability journey.
          </p>
        </div>

        <!-- Carousel Container -->
        <div class="relative">
          <div class="flex overflow-hidden rounded-lg">
            <div
              class="flex transition-transform duration-700 ease-in-out w-full"
              [style.transform]="'translateX(-' + currentSlide * 100 + '%)'"
            >
              <div
                *ngFor="let item of carouselItems; let i = index"
                class="w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <!-- Left Content -->
                <div class="space-y-6 order-2 lg:order-1">
                  <div>
                    <h3
                      class="text-2xl md:text-3xl font-serif font-semibold text-white mb-4"
                    >
                      {{ item.title }}
                    </h3>
                    <p class="text-gray-300 text-sm leading-relaxed mb-6">
                      {{ item.description }}
                    </p>
                  </div>

                  <button
                    class="bg-teal-500 hover:bg-teal-400 text-[#0B1022] font-semibold px-6 py-3 rounded-md transition-colors text-sm uppercase tracking-wider"
                    *ngIf="item.ctaText"
                  >
                    {{ item.ctaText }}
                  </button>
                </div>

                <!-- Right Image -->
                <div class="order-1 lg:order-2">
                  <div class="relative">
                    <img
                      [src]="item.image"
                      [alt]="item.title"
                      class="w-full rounded-lg shadow-2xl border border-gray-700"
                    />
                    <!-- Optional overlay for dashboard mockups -->
                    <div
                      class="absolute inset-0 rounded-lg"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Arrows -->
          <button
            (click)="prevSlide()"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-10"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            (click)="nextSlide()"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-10"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <!-- Indicators -->
        <div class="flex justify-center mt-8 space-x-2">
          <button
            *ngFor="let item of carouselItems; let i = index"
            (click)="goToSlide(i)"
            [class.bg-teal-400]="i === currentSlide"
            [class.bg-gray-600]="i !== currentSlide"
            class="w-3 h-3 rounded-full transition-colors duration-300 hover:bg-teal-300"
          ></button>
        </div>

        <!-- Bottom Navigation Labels -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div class="space-y-2">
            <h4
              class="text-white font-semibold text-sm uppercase tracking-wider"
            >
              Navigate
            </h4>
            <p class="text-xs text-gray-400">
              A next generation of ESG built on one place plus access to the
              legacy Measurabl platform.
            </p>
          </div>
          <div class="space-y-2">
            <h4
              class="text-white font-semibold text-sm uppercase tracking-wider"
            >
              Decades
            </h4>
            <p class="text-xs text-gray-400">
              Power your analysis and take insights actions to plan, execute,
              and measure project impact.
            </p>
          </div>
          <div class="space-y-2">
            <h4
              class="text-white font-semibold text-sm uppercase tracking-wider"
            >
              Track
            </h4>
            <p class="text-xs text-gray-400">
              Track performance across sustainability metrics with seamless data
              integrations.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      @media (max-width: 768px) {
        .grid-cols-2 {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class RealEstateCarouselComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  autoPlayInterval: any;

  carouselItems: CarouselItem[] = [
    {
      title: 'Navigate Your Portfolio',
      subtitle: 'Portfolio Dashboard',
      description:
        'Access comprehensive portfolio analytics with real-time ESG metrics, sustainability tracking, and performance insights all in one centralized dashboard.',
      image: '',
      ctaText: 'Explore →',
    },
    {
      title: 'Deep Dive Analytics',
      subtitle: 'Building Performance',
      description:
        'Get granular insights into individual building performance with detailed energy usage, carbon emissions, and sustainability certifications tracking.',
      image: 'assets/building-analytics.png',
      ctaText: 'Learn More →',
    },
    {
      title: 'Sustainability Reporting',
      subtitle: 'ESG Compliance',
      description:
        'Generate comprehensive ESG reports that meet global standards and regulatory requirements with automated data collection and validation.',
      image: 'assets/esg-reporting.png',
      ctaText: 'View Reports →',
    },
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Auto-advance every 5 seconds
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  prevSlide() {
    this.stopAutoPlay();
    this.currentSlide =
      this.currentSlide === 0
        ? this.carouselItems.length - 1
        : this.currentSlide - 1;
    this.startAutoPlay();
  }

  nextSlide() {
    this.stopAutoPlay();
    this.currentSlide =
      this.currentSlide === this.carouselItems.length - 1
        ? 0
        : this.currentSlide + 1;
    this.startAutoPlay();
  }

  goToSlide(index: number) {
    this.stopAutoPlay();
    this.currentSlide = index;
    this.startAutoPlay();
  }
}
