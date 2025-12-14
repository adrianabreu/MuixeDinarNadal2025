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
  @Input() isFloating: boolean = false;
  @Output() cardClick = new EventEmitter<Member>();
  @Output() revealStateChange = new EventEmitter<{ member: Member; state: number; wasAtState2?: boolean }>();
  
  // Estats: 0 = només àlies, 1 = àlies + frase, 2 = àlies + frase + categoria
  revealState = 0;

  handleClick(): void {
    if (this.isFloating) {
      // En el modal, canvia l'estat de revelació
      this.toggleReveal();
    } else {
      // En el grid, obre el modal
      this.cardClick.emit(this.member);
    }
  }

  toggleReveal(): void {
    // Si estem a l'estat 2 i fem clic, hauríem de tancar després de 0.5s
    const wasAtState2 = this.revealState === 2;
    console.log('toggleReveal - current state:', this.revealState, 'wasAtState2:', wasAtState2);
    this.revealState = (this.revealState + 1) % 3;
    const eventData = { 
      member: this.member, 
      state: this.revealState,
      wasAtState2: wasAtState2 
    };
    console.log('Emitting event:', eventData);
    this.revealStateChange.emit(eventData);
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

