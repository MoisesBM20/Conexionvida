// ... existing imports ...
import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-team',
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
export class TeamComponent implements OnInit, AfterViewInit {
  selectedMember: string | null = null;
  loading: boolean = true; // Estado de carga inicial

  memberInfo: any = {
    'director-general': {
      name: 'Frank Medina',
      role: 'Director General',
      email: 'fgmedina@gane.com.co',
      phone: '+57 321 816 5890',
      photo: './assets/images/team/frank.jpeg',
      description: 'Responsable de la dirección general y la toma de decisiones estratégicas de la organización.'
    },
    'jefe-cultura': {
      name: 'Ximena Garcés',
      role: 'Jefe de Cultura y Desarrollo',
      email: 'sxgarces@gane.com.co',
      phone: '+57 316 876 7528',
      photo: './assets/images/team/Ximena.jpeg',
      description: 'Lidera la cultura organizacional y el desarrollo del talento humano.'
    },
    'coord-atraccion': {
      name: 'M. Alexandra Valencia',
      role: 'Coordinadora de Atracción',
      email: 'mavalencia@gane.com.co',
      phone: '+57 318 306 2201',
      photo: './assets/images/team/Alexa.png',
      description: 'Coordina los procesos de atracción y selección de talento.'
    },
    'coord-bienestar': {
      name: 'Diana Katherine Ortega',
      role: 'Coord. Bienestar y Desarrollo',
      email: 'dkortega@gane.com.co',
      phone: '+57 318 373 1208',
      photo: './assets/images/team/Diana.JPG',
      description: 'Encargada de los programas de bienestar y desarrollo para los integrantes.'
    },
    'asistente-atraccion': {
      name: 'Adriana Maria Ordoñez',
      role: 'Asistente de Atracción',
      email: 'amordonez@gane.com.co',
      phone: '+57 316 479 1922',
      photo: './assets/images/team/Adriana.png',
      description: 'Apoya en la gestión y logística de los procesos de atracción de talento.'
    },
    'analista-atraccion': {
      name: 'Esperanza Lasso E.',
      role: 'Analista de Atracción',
      email: 'elasso@gane.com.co',
      phone: '+57 317 365 1164',
      photo: './assets/images/team/lasso.png',
      description: 'Analiza y ejecuta procesos de selección y reclutamiento.'
    },
    'analista-bienestar': {
      name: 'Yecid Ortiz Hernandez',
      role: 'Analista de Bienestar y Desarrollo',
      email: 'yortiz@gane.com.co',
      phone: '+57 317 427 6365',
      photo: './assets/images/team/Yesid.png',
      description: 'Implementa y evalúa programas de bienestar y desarrollo.'
    },
    'aprendiz-bienestar': {
      name: 'Claudia V. Casamachin',
      role: 'Aprendiz de Bienestar y Desarrollo',
      email: 'cvcasamachin@gane.com.co',
      phone: '',
      photo: './assets/images/team/Claudia.png',
      description: 'Apoya en las actividades de bienestar y desarrollo organizacional.'
    }
  };

  private totalImages = 0;
  private loadedImages = 0;
  private logoAnimationCount = 0; // <--- Cambia aquí

  @ViewChild('logoAnim', { static: false }) logoAnimRef!: ElementRef;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // 1. Espera a que el logo haga dos animaciones completas
    setTimeout(() => {
      const logoEl = this.el.nativeElement.querySelector('.official-logo-animation');
      if (logoEl) {
        this.renderer.listen(logoEl, 'animationiteration', () => {
          this.logoAnimationCount++;
          this.tryHideLoading();
        });
      }
    });

    // 2. Espera a que las imágenes carguen
    setTimeout(() => {
      const images: NodeListOf<HTMLImageElement> = this.el.nativeElement.querySelectorAll('.org-container img, .info-panel img');
      this.totalImages = images.length;
      this.loadedImages = 0;

      images.forEach(img => {
        if (img.complete) {
          this.onImageLoad();
        } else {
          this.renderer.listen(img, 'load', () => this.onImageLoad());
          this.renderer.listen(img, 'error', () => this.onImageLoad());
        }
      });

      if (this.totalImages === 0) {
        this.loadedImages = 1;
        this.tryHideLoading();
      }
    });
  }

  onImageLoad() {
    this.loadedImages++;
    this.tryHideLoading();
  }

  tryHideLoading() {
    // Ahora requiere dos ciclos de animación del logo
    if (this.logoAnimationCount >= 2 && this.loadedImages >= this.totalImages) {
      setTimeout(() => {
        this.loading = false;
      }, 100); // Pequeño delay para suavidad
    }
  }

  selectMember(memberId: string) {
    this.selectedMember = memberId;
  }
}