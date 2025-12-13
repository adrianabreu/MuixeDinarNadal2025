import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personatge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personatge.component.html',
  styleUrls: ['./personatge.component.css']
})
export class PersonatgeComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  goToResults(): void {
    this.router.navigate(['/'], { queryParams: { screen: 'results' } });
  }
}

