import { Component, ElementRef, Inject, PLATFORM_ID, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./layout/footer/footer";
import { Cta } from "./components/cta/cta";
import { Features } from "./components/features/features";
import { Testimonials } from "./components/testimonials/testimonials";
import { UserSegments } from "./components/user-segments/user-segments";
import { QuantumCloudComponent } from "./components/quantum-cloud/quantum-cloud";
import { Hero } from "./components/hero/hero";
import { NavBarComponent } from "./layout/nav-bar/nav-bar";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CustomerImpact } from "./components/customer-impact/customer-impact";
import { LeadingCompaniesComponent } from "./components/companies/companies";
import { Award } from "./components/award/award";
import { GlobalImpact } from "./components/global-impact/global-impact";
@Component({
  selector: 'app-root',
  imports: [
    CarouselModule,
    CommonModule,
    RouterOutlet,
    Footer,
    Cta,
    Features,
    Testimonials,
    UserSegments,
    Hero,
    NavBarComponent,
    QuantumCloudComponent,
    CustomerImpact,
    LeadingCompaniesComponent,
    Award,
    GlobalImpact
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  @ViewChildren('animatedSection', { read: ElementRef })
  animatedSections!: QueryList<ElementRef>;
  visibleSections: boolean[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.visibleSections = Array(this.animatedSections.length).fill(false); // Important: initialize all values!

      this.animatedSections.forEach((section: ElementRef, idx: number) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // Toggle animation based on viewport intersection
              this.visibleSections[idx] = entry.isIntersecting;
            });
          },
          {
            threshold: 0.1, // adjust sensitivity as needed
          }
        );
        observer.observe(section.nativeElement);
      });
    }
  }
  public companyLogos = signal([
    './Measurabl/imgi_15_navigate-disclosure.png',
    './Measurabl/imgi_16_diligence.png',
    './Measurabl/imgi_17_optimize.png',
  ]);

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 1000,
    smartSpeed: 600,
    nav: true,
    navSpeed: 700,
    navText: ['‹', '›'],
    dots: true,
    dotsEach: false,
    dotsSpeed: 500,
    items: 1,
    margin: 10,
    stagePadding: 0,
    center: false,
    startPosition: 0,
    URLhashListener: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    freeDrag: false,
    lazyLoad: false,
    lazyLoadEager: 0,
    autoWidth: false,
    autoHeight: false,
    responsive: {
      0: {
        items: 1,
      },
      640: {
        items: 3,
      },
      1024: {
        items: 3,
      },
    },
  };

  public products = signal([
    {
      image: './Measurabl/imgi_15_navigate-disclosure.png',
      mainTitle: 'NAVIGATE',
      subtitle: 'CORE LEGACY',
      description:
        'A next-generation set of ESG tools in one place plus access to the legacy Measurabl platform.',
      subDescription:
        'Maintain access to our trusted, time-tested, market-leading ESG platform.',
    },
    {
      image: './Measurabl/imgi_17_optimize.png',
      mainTitle: 'NAVIGATE',
      subtitle: 'DATA MANAGER',
      description:
        'A next-generation set of ESG tools in one place plus access to the legacy Measurabl platform.',
      subDescription:
        'Streamline data management and ensure quality data to move confidently across every step of your sustainability journey.',
    },
    {
      image: './Measurabl/imgi_15_navigate-disclosure.png',
      mainTitle: 'NAVIGATE',
      subtitle: 'INSIGHTS',
      description:
        'A next-generation set of ESG tools in one place plus access to the legacy Measurabl platform.',
      subDescription:
        'Leverage powerful visualization tools, easily customized for your needs.',
    },
    {
      image: './Measurabl/imgi_17_optimize.png',
      mainTitle: 'NAVIGATE',
      subtitle: 'DECARB',
      description:
        'A next-generation set of ESG tools in one place plus access to the legacy Measurabl platform.',
      subDescription:
        'Visualize scenarios and take tangible actions to plan, execute, and measure project impact.',
    },
  ]);
}
