// ... existing imports ...
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-pruebas',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  animations: [
    trigger('panelAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('400ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'translateY(30px)' }))
      ])
    ])
  ]
})
export class TeamComponent {
  selectedMember: string | null = null;

  memberInfo: any = {
    'director-general': {
      name: 'Frank Medina',
      role: 'Director General',
      email: 'f.medina#example.com',
      phone: '+57 300 123 4567',
      photo: './assets/images/personaje.png',
      description: 'Responsable de la dirección general y la toma de decisiones estratégicas de la organización.'
    },
    'jefe-cultura': {
      name: 'Ximena Garcés',
      role: 'Jefe de Cultura y Desarrollo',
      email: 'x.garces#example.com',
      phone: '+57 300 234 5678',
      photo: './assets/images/personaje.png',
      description: 'Lidera la cultura organizacional y el desarrollo del talento humano.'
    },
    'coord-atraccion': {
      name: 'M. Alexandra Valencia',
      role: 'Coordinadora de Atracción',
      email: 'a.valencia#example.com',
      phone: '+57 300 345 6789',
      photo: './assets/images/personaje.png',
      description: 'Coordina los procesos de atracción y selección de talento.'
    },
    'coord-bienestar': {
      name: 'Diana Katherine Ortega',
      role: 'Coord. Bienestar y Desarrollo',
      email: 'd.ortega#example.com',
      phone: '+57 300 456 7890',
      photo: './assets/images/personaje.png',
      description: 'Encargada de los programas de bienestar y desarrollo para los colaboradores.'
    },
    'asistente-atraccion': {
      name: 'Adriana Maria Ordoñez',
      role: 'Asistente de Atracción',
      email: 'a.ordonez#example.com',
      phone: '+57 300 567 8901',
      photo: './assets/images/personaje.png',
      description: 'Apoya en la gestión y logística de los procesos de atracción de talento.'
    },
    'analista-atraccion': {
      name: 'Esperanza Lasso E.',
      role: 'Analista de Atracción',
      email: 'e.lasso#example.com',
      phone: '+57 300 678 9012',
      photo: './assets/images/personaje.png',
      description: 'Analiza y ejecuta procesos de selección y reclutamiento.'
    },
    'auxiliar-atraccion': {
      name: 'Yesid Ortiz Hernandez',
      role: 'Auxiliar de Atracción',
      email: 'y.ortiz#example.com',
      phone: '+57 300 789 0123',
      photo: './assets/images/personaje.png',
      description: 'Brinda soporte administrativo en el área de atracción.'
    },
    'analista-bienestar': {
      name: 'Diana Carolina Osorio',
      role: 'Analista de Bienestar y Desarrollo',
      email: 'd.osorio#example.com',
      phone: '+57 300 890 1234',
      photo: './assets/images/personaje.png',
      description: 'Implementa y evalúa programas de bienestar y desarrollo.'
    },
    'aprendiz-bienestar': {
      name: 'Aprendiz',
      role: 'Aprendiz de Bienestar y Desarrollo',
      email: 'aprendiz#example.com',
      phone: '+57 300 901 2345',
      photo: './assets/images/personaje.png',
      description: 'Apoya en las actividades de bienestar y desarrollo organizacional.'
    }
  };

  selectMember(memberId: string) {
    this.selectedMember = memberId;
  }
}