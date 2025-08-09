import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {
  features = [
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description:
        'Comprehensive data analysis with machine learning insights for predictive performance optimization.',
      benefits: [
        'Real-time performance monitoring',
        'Predictive maintenance alerts',
        'Trend analysis and forecasting',
      ],
    },
    {
      icon: '🔄',
      title: 'Automated Reporting',
      description:
        'Generate compliance and sustainability reports automatically with customizable templates and scheduling.',
      benefits: [
        'GRESB, ENERGY STAR, and custom reports',
        'Scheduled report delivery',
        'Multi-format export options',
      ],
    },
    {
      icon: '🌍',
      title: 'Carbon Management',
      description:
        'Track, analyze, and reduce your carbon footprint with comprehensive emissions monitoring and reporting.',
      benefits: [
        'Scope 1, 2, and 3 emissions tracking',
        'Carbon reduction planning',
        'Net-zero pathway mapping',
      ],
    },
    {
      icon: '📱',
      title: 'Mobile Access',
      description:
        'Access your data anywhere with responsive design and dedicated mobile applications for field teams.',
      benefits: [
        'iOS and Android apps',
        'Offline data collection',
        'Push notifications for alerts',
      ],
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description:
        'Bank-grade security with advanced encryption, access controls, and compliance certifications.',
      benefits: [
        'SOC 2 Type II certified',
        'Role-based access control',
        '256-bit encryption',
      ],
    },
    {
      icon: '🎯',
      title: 'Goal Tracking',
      description:
        'Set and monitor sustainability goals with milestone tracking and progress visualization.',
      benefits: [
        'Custom goal setting',
        'Progress dashboards',
        'Achievement notifications',
      ],
    },
  ];

  integrations = [
    { name: 'Excel', icon: '📊' },
    { name: 'SAP', icon: '💼' },
    { name: 'Oracle', icon: '🏛️' },
    { name: 'Salesforce', icon: '☁️' },
    { name: 'Yardi', icon: '🏢' },
    { name: 'MRI', icon: '📈' },
    { name: 'JLL', icon: '🌐' },
    { name: 'CBRE', icon: '🏗️' },
    { name: 'Procore', icon: '🔧' },
    { name: 'PowerBI', icon: '📋' },
    { name: 'Tableau', icon: '📊' },
    { name: 'API', icon: '🔗' },
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
