import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberCardComponent, Member } from './member-card.component';

type Screen = 'intro' | 'game' | 'results';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MemberCardComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./app.css']
})
export class GameComponent implements OnInit {
  // Constant per definir quantes persones per grup
  private readonly MEMBERS_PER_GROUP = 4;

  // Control de pantalla
  currentScreen: Screen = 'intro';

  // Dades
  allMembers: Member[] = [];
  currentGroupIndex = 0;
  currentGroup: Member[] = [];
  totalGroups = 0;

  // Resultats: membre seleccionat
  selectedMember: Member | null = null;

  // Game screen: membre actiu (en procés de revelació)
  activeMember: Member | null = null;
  private previousRevealState: number = 0;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMembers();
    
    // Comprova si hem de navegar directament a la pantalla de resultats
    this.route.queryParams.subscribe(params => {
      if (params['screen'] === 'results') {
        this.currentScreen = 'results';
      }
    });
  }

  /**
   * Carrega els membres des del fitxer JSON
   */
  loadMembers(): void {
    // Try public folder first (served from root), then assets folder
    this.http.get<Member[]>('/members.json').subscribe({
      next: (data) => {
        this.allMembers = data;
        this.totalGroups = Math.ceil(this.allMembers.length / this.MEMBERS_PER_GROUP);
        this.updateCurrentGroup();
      },
      error: (err) => {
        console.error('Error carregant membres des de /members.json:', err);
        // Fallback to assets folder
        this.http.get<Member[]>('assets/members.json').subscribe({
          next: (data) => {
            this.allMembers = data;
            this.totalGroups = Math.ceil(this.allMembers.length / this.MEMBERS_PER_GROUP);
            this.updateCurrentGroup();
          },
          error: (err2) => {
            console.error('Error carregant membres des de assets/members.json:', err2);
          }
        });
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
    // Clear active member when changing groups
    this.activeMember = null;
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

  /**
   * Canvia de pantalla
   */
  goToScreen(screen: Screen): void {
    this.currentScreen = screen;
    if (screen !== 'results') {
      this.selectedMember = null;
    }
  }

  /**
   * Navega al següent grup o mostra els resultats finals
   */
  nextGroupOrResults(): void {
    if (this.isLastGroup()) {
      this.goToScreen('results');
    } else {
      this.nextGroup();
    }
  }

  /**
   * Obté el recompte per categories amb els membres
   */
  getCategoryCounts(): { categoria: string; count: number; color: string; members: Member[] }[] {
    const groups = new Map<string, Member[]>();
    
    this.allMembers.forEach(member => {
      const members = groups.get(member.categoria) || [];
      members.push(member);
      groups.set(member.categoria, members);
    });

    const colors: { [key: string]: string } = {
      'Muixelovers': '#FF3F32',
      'FOMO de Ferro': '#19C7E6',
      'Talents Emergents': '#4CAF50',
      'Comboiet': '#FFC107'
    };

    return Array.from(groups.entries()).map(([categoria, members]) => ({
      categoria,
      count: members.length,
      color: colors[categoria] || '#666',
      members
    }));
  }

  /**
   * Selecciona o deselecciona un membre
   */
  toggleMemberSelection(member: Member): void {
    if (this.selectedMember === member) {
      this.selectedMember = null;
    } else {
      this.selectedMember = member;
    }
  }

  /**
   * Comprova si un membre està seleccionat
   */
  isMemberSelected(member: Member): boolean {
    return this.selectedMember === member;
  }

  /**
   * Comprova si hi ha algun membre seleccionat
   */
  hasSelectedMember(): boolean {
    return this.selectedMember !== null;
  }

  /**
   * Gestiona el canvi d'estat de revelació d'un membre
   */
  /**
   * Obre l'overlay amb el membre seleccionat
   */
  openOverlay(member: Member): void {
    this.activeMember = member;
    this.previousRevealState = 0; // Reset state quan s'obri l'overlay
  }

  /**
   * Tanca l'overlay
   */
  closeOverlay(): void {
    console.log('closeOverlay called, activeMember before:', this.activeMember);
    this.activeMember = null;
    this.cdr.detectChanges();
    console.log('closeOverlay called, activeMember after:', this.activeMember);
  }

  /**
   * Gestiona els canvis d'estat de revelació en el modal
   */
  onMemberRevealChange(event: { member: Member; state: number; wasAtState2?: boolean }): void {
    // Si estem a l'estat 2 (categoria) i fem clic, tanca l'overlay després de 0.5s
    if (event.wasAtState2 === true) {
      console.log('Tancant l\'overlay després de 0.5s, activeMember:', this.activeMember);
      setTimeout(() => {
        console.log('Timeout executed, activeMember:', this.activeMember);
        this.closeOverlay();
      }, 500);
    }
    this.previousRevealState = event.state;
  }

  /**
   * Navega a la pàgina del personatge de l'any
   */
  goToPersonatge(): void {
    this.router.navigate(['/personatge']);
  }

  /**
   * Navega al buscador de persones
   */
  goToBuscador(): void {
    this.router.navigate(['/buscador']);
  }

  /**
   * Navega a la pàgina del premi d'assistència
   */
  goToAssistencia(): void {
    this.router.navigate(['/assistencia']);
  }

  /**
   * Navega directament a un grup específic
   */
  goToGroup(index: number): void {
    if (index >= 0 && index < this.totalGroups) {
      this.currentGroupIndex = index;
      this.updateCurrentGroup();
    }
  }

  /**
   * Retorna un array amb els índexs de tots els grups per la paginació
   */
  getGroupIndexes(): number[] {
    return Array.from({ length: this.totalGroups }, (_, i) => i);
  }
}

