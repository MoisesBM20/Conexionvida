import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

// Interfaces para la estructura de datos
export interface TimelinePost {
  date: string;
  imageUrl: string;
  altText: string;
  description: string;
}

export interface ModalContent {
  title: string;
  text: string;
  icon: string;
}

export interface BenefitButton {
  icon: string;
  text: string;
  modalData?: ModalContent;
  action: (data?: ModalContent) => void;
}

@Component({
  selector: 'app-beducational',
  templateUrl: './beducational.component.html',
  styleUrls: ['./beducational.component.scss']
})
export class BEducationalComponent {

  isInfoModalVisible = false;
  isModalClosing = false;
  selectedModalContent: ModalContent | null = null;

  private monthOrder = [
    'MES DE ENERO', 'MES DE FEBRERO', 'MES DE MARZO', 'MES DE ABRIL',
    'MES DE MAYO', 'MES DE JUNIO', 'MES DE JULIO', 'MES DE AGOSTO',
    'MES DE SEPTIEMBRE', 'MES DE OCTUBRE', 'MES DE NOVIEMBRE', 'MES DE DICIEMBRE'
  ];

  get currentMonth(): string {
    return this.monthOrder[new Date().getMonth()];
  }

  get groupedPosts() {
    const groups = this.posts.reduce((acc, post) => {
      (acc[post.date] = acc[post.date] || []).push(post);
      return acc;
    }, {} as { [key: string]: TimelinePost[] });
    
    return Object.keys(groups)
      .map(month => ({ month, posts: groups[month] }))
      .sort((a, b) => {
        if (a.month === this.currentMonth) return -1;
        if (b.month === this.currentMonth) return 1;
        return this.monthOrder.indexOf(b.month) - this.monthOrder.indexOf(a.month);
      });
  }

  posts: TimelinePost[] = [
    {
      date: 'MES DE JULIO',
      imageUrl: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/09/signal-2024-11-09-112137_005-768x512.jpeg',
      altText: 'Charla de Liderazgo',
      description: 'Participa en nuestra próxima charla sobre liderazgo y desarrollo de habilidades gerenciales. ¡Potencia tu carrera con nosotros!'
    },
    {
      date: 'MES DE JUNIO',
      imageUrl: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/09/NUEVO-CONVENIO.png',
      altText: 'Convenio Uniminuto',
      description: '¡Tenemos un nuevo convenio con Uniminuto! Accede a descuentos especiales en programas de pregrado y posgrado para ti y tu familia.'
    },
  ];

  benefitButtons: BenefitButton[] = [
    { icon: 'school', text: 'Formación y/o Capacitación', modalData: { title: 'Formación y Capacitación', text: 'Accede a nuestro plan anual de formación con cursos, talleres y diplomados para potenciar tus habilidades técnicas y blandas.', icon: 'school' }, action: (data) => this.openInfoModal(data!) },
    { icon: 'stairs', text: 'Escala Salarial', modalData: { title: 'Escala Salarial', text: 'Conoce nuestra estructura de escala salarial, diseñada para promover el crecimiento y reconocer tu desarrollo profesional dentro de la compañía.', icon: 'stairs' }, action: (data) => this.openInfoModal(data!) },
    { icon: 'cast_for_education', text: 'Apoyos Educativos', modalData: { title: 'Apoyos Educativos', text: 'Ofrecemos auxilios económicos para matrículas de pregrado, posgrado e idiomas para ti y tus hijos.', icon: 'cast_for_education' }, action: (data) => this.openInfoModal(data!) },
    { icon: 'military_tech', text: 'Bono Graduando', modalData: { title: 'Bono Graduando', text: '¡Celebramos tus logros! Recibe un bono de reconocimiento al graduarte de tu programa técnico, tecnológico o profesional.', icon: 'military_tech' }, action: (data) => this.openInfoModal(data!) },
    { icon: 'add_circle', text: 'Más Convenios', action: () => this.navigateTo('/agreement') }
  ];

  constructor(private router: Router) { }

  openInfoModal(data: ModalContent): void {
    this.selectedModalContent = data;
    this.isInfoModalVisible = true;
  }

  closeInfoModal(): void {
    this.isModalClosing = true;
    setTimeout(() => {
      this.isInfoModalVisible = false;
      this.isModalClosing = false;
      this.selectedModalContent = null;
    }, 300);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isInfoModalVisible) {
      this.closeInfoModal();
    }
  }
}
