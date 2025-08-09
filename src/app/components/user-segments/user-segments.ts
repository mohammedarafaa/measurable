import { Component } from '@angular/core';

@Component({
  selector: 'app-user-segments',
  imports: [],
  templateUrl: './user-segments.html',
  styleUrl: './user-segments.scss',
})
export class UserSegments {
  selectedSegment: number | null = null;

  userSegments = [
    {
      icon: '🏢',
      title: 'Owners & Direct Investors',
      description:
        'Maximize asset value and demonstrate ESG leadership through comprehensive sustainability data management and performance optimization strategies.',
      features: [
        'Portfolio performance tracking and benchmarking',
        'Asset value optimization through sustainability metrics',
        'Comprehensive ESG and sustainability reporting',
        'Regulatory compliance and risk management',
        'Carbon footprint analysis and reduction planning',
      ],
    },
    {
      icon: '⚙️',
      title: 'Property Operators',
      description:
        'Streamline operations with centralized data management, automated reporting, and actionable insights for enhanced building performance and efficiency.',
      features: [
        'Operational efficiency tracking and optimization',
        'Real-time energy and resource management',
        'Preventive maintenance scheduling and alerts',
        'Performance benchmarking against industry standards',
        'Automated compliance and sustainability reporting',
      ],
    },
    {
      icon: '💼',
      title: 'Investment Managers & Lenders',
      description:
        'Make informed investment decisions with comprehensive ESG data, risk assessment tools, and portfolio-wide sustainability analytics.',
      features: [
        'Investment risk analysis and due diligence tools',
        'Comprehensive ESG data for decision making',
        'Portfolio benchmarking and performance metrics',
        'Stakeholder reporting and transparency tools',
        'Climate risk assessment and scenario planning',
      ],
    },
    {
      icon: '📈',
      title: 'Indirect Investors',
      description:
        'Access transparent sustainability metrics and comprehensive performance data to make informed investment choices and track ESG impact.',
      features: [
        'Complete transparency in investment performance',
        'Access to real-time sustainability metrics',
        'ESG impact tracking and reporting',
        'Market insights and trend analysis',
        'Standardized reporting across portfolios',
      ],
    },
  ];

  successMetrics = [
    { value: '40%', label: 'Cost Reduction' },
    { value: '85%', label: 'Time Savings' },
    { value: '99%', label: 'Data Accuracy' },
    { value: '500+', label: 'Happy Clients' },
  ];

  ngOnInit() {
    this.observeAnimations();
  }

  selectSegment(index: number) {
    this.selectedSegment = this.selectedSegment === index ? null : index;
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
