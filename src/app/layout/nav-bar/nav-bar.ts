import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.scss'],
})
export class NavBarComponent {
  isScrolled = false;
  menuOpen = false;

  // navItems = [
  //   {
  //     name: 'Solutions',
  //     href: '#solutions',
  //     children: [
  //       {
  //         name: 'Owners & Investors',
  //         href: '#owners',
  //         description: 'Maximize asset value',
  //       },
  //       {
  //         name: 'Operators',
  //         href: '#operators',
  //         description: 'Streamline operations',
  //       },
  //       {
  //         name: 'Investment Managers',
  //         href: '#managers',
  //         description: 'Informed decisions',
  //       },
  //     ],
  //   },
  //   { name: 'Platform', href: '#platform' },
  //   { name: 'Resources', href: '#resources' },
  //   { name: 'Company', href: '#company' },
  // ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
