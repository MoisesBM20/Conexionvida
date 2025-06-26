import { Component } from '@angular/core';
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
  modalData?: ModalContent; // Hacemos modalData opcional
  action: (data?: ModalContent) => void;
}

@Component({
  selector: 'app-bfinancial',
  templateUrl: './bfinancial.component.html',
  styleUrls: ['./bfinancial.component.scss']
})
export class BFinancialComponent {
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
      imageUrl: './assets/images/ring/bfinancial/ahorro.jpg',
      altText: 'Charla de Ahorro',
      description: 'Aprende a gestionar tus finanzas personales y a planificar tu futuro con nuestra charla sobre la importancia del ahorro.'
    },
    {
      date: 'MES DE JUNIO',
      imageUrl: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/09/SOAY-T-RTM.jpeg',
      altText: 'Créditos',
      description: 'Conoce las opciones de crédito con tasas preferenciales que tenemos para ti. ¡Cumple tus sueños!'
    },
  ];

  benefitButtons: BenefitButton[] = [
    { icon: 'directions_car', text: 'SOAT y RTM', modalData: { title: 'SOAT y RTM', text: 'Financia el SOAT y la Revisión Tecnicomecánica de tu vehículo a través de la cooperativa con tasas de interés preferenciales.', icon: 'directions_car' }, action: (data) => this.openInfoModal(data!) },
    { icon: 'phone_android', text: 'Celulares Corporativos', modalData: { title: 'Celulares Corporativos', text: 'Accede a planes de telefonía móvil corporativos con excelentes tarifas y beneficios para ti y tu familia.', icon: 'phone_android' }, action: (data) => this.openInfoModal(data!) },
    { icon: 'house', text: 'Asesoría en Vivienda', modalData: { title: 'Asesoría en Vivienda', text: 'Te brindamos acompañamiento y asesoría para que puedas cumplir el sueño de tener casa propia a través de nuestros convenios.', icon: 'house' }, action: (data) => this.openInfoModal(data!) },
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
}
