import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  testimonials = [
    {
      quote:
        "Measurabl has transformed how we approach sustainability reporting. The platform's accuracy and ease of use have saved us countless hours while improving our data quality.",
      author: 'Sarah Johnson',
      title: 'VP of Sustainability',
      company: 'Global Properties Inc.',
    },
    {
      quote:
        "The integration capabilities and real-time analytics have given us unprecedented visibility into our portfolio performance. It's become essential to our operations.",
      author: 'Michael Chen',
      title: 'Portfolio Manager',
      company: 'Urban Realty Partners',
    },
    {
      quote:
        "With Measurabl, we've achieved our carbon reduction goals ahead of schedule. The platform's insights have driven meaningful operational improvements across our assets.",
      author: 'Emily Rodriguez',
      title: 'Director of ESG',
      company: 'Sustainable Ventures',
    },
    {
      quote:
        'The automated reporting features have streamlined our compliance processes. What used to take weeks now happens with a few clicks, and the accuracy is unmatched.',
      author: 'David Kim',
      title: 'Chief Operating Officer',
      company: 'Metro Development Group',
    },
    {
      quote:
        "Measurabl's global coverage and localized compliance support have been crucial for our international portfolio. It's the only platform that truly understands global real estate.",
      author: 'Anna Martinez',
      title: 'International Portfolio Director',
      company: 'WorldWide Properties',
    },
    {
      quote:
        "The platform's predictive analytics have helped us identify potential issues before they become costly problems. The ROI has been substantial across our entire portfolio.",
      author: 'James Wilson',
      title: 'Asset Manager',
      company: 'Premier Real Estate Fund',
    },
  ];

  impactStats = [
    {
      value: '30%',
      label: 'Cost Reduction',
      description: 'Average operational savings',
    },
    {
      value: '85%',
      label: 'Time Savings',
      description: 'In reporting processes',
    },
    {
      value: '40%',
      label: 'Carbon Reduction',
      description: 'Achieved by clients',
    },
    {
      value: '99.9%',
      label: 'Data Accuracy',
      description: 'Verified and validated',
    },
  ];

  clients = [
    { name: 'CBRE', logo: '🏢' },
    { name: 'JLL', logo: '🌐' },
    { name: 'BlackRock', logo: '⚫' },
    { name: 'Brookfield', logo: '🌊' },
    { name: 'Boston Properties', logo: '🏛️' },
    { name: 'Prologis', logo: '📦' },
  ];

  ngOnInit() {
    this.observeAnimations();
  }

  private observeAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.observe-animation');
    elements.forEach((el) => observer.observe(el));
  }
}
