import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personatge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personatge.component.html',
  styleUrls: ['./personatge.component.css']
})
export class PersonatgeComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Allow scrolling on body when personatge component is active
    document.body.classList.add('personatge-active');
  }

  ngOnDestroy(): void {
    // Remove the class when component is destroyed
    document.body.classList.remove('personatge-active');
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  goToResults(): void {
    this.router.navigate(['/'], { queryParams: { screen: 'results' } });
  }
}

