import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Member {
  nom: string;
  alias: string;
  context: string;
  fraseBarret: string;
  categoria: string;
}

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input() member!: Member;
  @Output() revealStateChange = new EventEmitter<{ member: Member; state: number }>();
  
  // Estats: 0 = només àlies, 1 = àlies + frase, 2 = àlies + frase + categoria
  revealState = 0;

  toggleReveal(): void {
    this.revealState = (this.revealState + 1) % 3;
    this.revealStateChange.emit({ member: this.member, state: this.revealState });
  }

  getCategoryColor(): string {
    const colors: { [key: string]: string } = {
      'Muixelovers': '#FF3F32',
      'FOMO de Ferro': '#19C7E6',
      'Talents emergents': '#4CAF50',
      'Comboiet': '#FFC107'
    };
    return colors[this.member.categoria] || '#666';
  }
}

