import { Component, HostListener, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, FormsModule,  CommonModule], // ✅ FormsModule REQUIRED
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('500ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      state('void', style({ transform: 'translateY(20px)', opacity: 0 })),
      transition(':enter', [
        animate(
          '400ms 200ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        )
      ])
    ])
  ]
})
export class DashboardComponent implements AfterViewInit {

  // ================= GENERAL =================
  currentYear = new Date().getFullYear();
  isScrolled = false;

  constructor(private router: Router) {}

  // ================= CONTACT FORM =================
  name = '';
  email = '';
  message = '';

  emailError = false;
  showPopup = false;

  validateEmail(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailPattern.test(this.email);
  }

  sendMessage(): void {
    this.validateEmail();

    if (!this.emailError && this.name && this.message) {
      this.showPopup = true;

      // reset form
      this.name = '';
      this.email = '';
      this.message = '';
    }
  }

  closePopup(): void {
    this.showPopup = false;
  }

  // ================= LIFECYCLE =================
  ngAfterViewInit(): void {
    const video = document.querySelector('.bg-video') as HTMLVideoElement;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }

  // ================= NAVIGATION =================
  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = this.getNavbarOffset();
      const top =
        el.getBoundingClientRect().top +
        window.pageYOffset -
        navOffset;

      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  scrollToContact(): void {
    this.scrollToSection('contact');
  }

  goToDashboard(): void {
    this.router.navigate(['/dash']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  private getNavbarOffset(): number {
    const nav = document.querySelector('.landing-navbar') as HTMLElement;
    return nav?.offsetHeight ? nav.offsetHeight + 8 : 80;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 8;
  }
}
