import { Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { PersonatgeComponent } from './personatge.component';
import { AssistenciaComponent } from './assistencia.component';
import { BuscadorComponent } from './buscador.component';

export const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'personatge', component: PersonatgeComponent },
  { path: 'assistencia', component: AssistenciaComponent },
  { path: 'buscador', component: BuscadorComponent },
  { path: '**', redirectTo: '' }
];

