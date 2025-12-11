import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MemberCardComponent, Member } from './member-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MemberCardComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  // Constant per definir quantes persones per grup
  private readonly MEMBERS_PER_GROUP = 4;

  // Dades
  allMembers: Member[] = [];
  currentGroupIndex = 0;
  currentGroup: Member[] = [];
  totalGroups = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  /**
   * Carrega els membres des del fitxer JSON
   */
  loadMembers(): void {
    this.http.get<Member[]>('members.json').subscribe({
      next: (data) => {
        this.allMembers = data;
        this.totalGroups = Math.ceil(this.allMembers.length / this.MEMBERS_PER_GROUP);
        this.updateCurrentGroup();
      },
      error: (err) => {
        console.error('Error carregant membres:', err);
      }
    });
  }

  /**
   * Actualitza el grup actual segons l'índex
   */
  updateCurrentGroup(): void {
    const startIndex = this.currentGroupIndex * this.MEMBERS_PER_GROUP;
    const endIndex = startIndex + this.MEMBERS_PER_GROUP;
    this.currentGroup = this.allMembers.slice(startIndex, endIndex);
  }

  /**
   * Navega al grup següent
   */
  nextGroup(): void {
    if (this.currentGroupIndex < this.totalGroups - 1) {
      this.currentGroupIndex++;
      this.updateCurrentGroup();
    }
  }

  /**
   * Navega al grup anterior
   */
  previousGroup(): void {
    if (this.currentGroupIndex > 0) {
      this.currentGroupIndex--;
      this.updateCurrentGroup();
    }
  }

  /**
   * Reset: torna al primer grup
   */
  reset(): void {
    this.currentGroupIndex = 0;
    this.updateCurrentGroup();
  }

  /**
   * Comprova si és el primer grup
   */
  isFirstGroup(): boolean {
    return this.currentGroupIndex === 0;
  }

  /**
   * Comprova si és l'últim grup
   */
  isLastGroup(): boolean {
    return this.currentGroupIndex === this.totalGroups - 1;
  }
}
