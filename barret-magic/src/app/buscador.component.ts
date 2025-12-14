import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Member } from './member-card.component';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  allMembers: Member[] = [];
  filteredMembers: Member[] = [];
  searchTerm = '';

  private readonly categoryColors: { [key: string]: string } = {
    'Muixelovers': '#FF3F32',
    'FOMO de Ferro': '#19C7E6',
    'Talents Emergents': '#4CAF50',
    'Comboiet': '#FFC107'
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.http.get<Member[]>('/members.json').subscribe({
      next: (data) => {
        this.allMembers = data;
        this.filteredMembers = [...data];
      },
      error: (err) => {
        console.error('Error carregant membres des de /members.json:', err);
        this.http.get<Member[]>('assets/members.json').subscribe({
          next: (data) => {
            this.allMembers = data;
            this.filteredMembers = [...data];
          },
          error: (err2) => {
            console.error('Error carregant membres des de assets/members.json:', err2);
          }
        });
      }
    });
  }

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term) {
      this.filteredMembers = [...this.allMembers];
      return;
    }

    this.filteredMembers = this.allMembers.filter(member => 
      member.nom.toLowerCase().includes(term) ||
      member.alias.toLowerCase().includes(term)
    );
  }

  getCategoryColor(categoria: string): string {
    return this.categoryColors[categoria] || '#666';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  goToResults(): void {
    this.router.navigate(['/'], { queryParams: { screen: 'results' } });
  }
}
