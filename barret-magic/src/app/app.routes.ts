import { Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { PersonatgeComponent } from './personatge.component';
import { BuscadorComponent } from './buscador.component';

export const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'personatge', component: PersonatgeComponent },
  { path: 'buscador', component: BuscadorComponent },
  { path: '**', redirectTo: '' }
];

