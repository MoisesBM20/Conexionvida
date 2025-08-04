import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Category {
  name: string;
  images: { imageUrl: string; altText: string; description: string }[];
}

interface MonthGroup {
  month: string;
  categories: Category[];
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
  selector: 'app-bfinancial',
  templateUrl: './bfinancial.component.html',
  styleUrls: ['./bfinancial.component.scss']
})
export class BFinancialComponent {
  isInfoModalVisible = false;
  isModalClosing = false;
  selectedModalContent: ModalContent | null = null;

  // Modal de imagen
  selectedImage: { imageUrl: string; altText: string; description: string } | null = null;

  private monthOrder = [
    'MES DE ENERO', 'MES DE FEBRERO', 'MES DE MARZO', 'MES DE ABRIL',
    'MES DE MAYO', 'MES DE JUNIO', 'MES DE JULIO', 'MES DE AGOSTO',
    'MES DE SEPTIEMBRE', 'MES DE OCTUBRE', 'MES DE NOVIEMBRE', 'MES DE DICIEMBRE'
  ];

  get currentMonth(): string {
    return this.monthOrder[new Date().getMonth()];
  }

  get visibleMonthGroups(): MonthGroup[] {
    const currentIdx = this.monthOrder.indexOf(this.currentMonth);
    const prevIdx = (currentIdx - 1 + this.monthOrder.length) % this.monthOrder.length;
    const monthsToShow = [
      this.monthOrder[currentIdx],
      this.monthOrder[prevIdx]
    ];
    return monthsToShow
      .map(month => this.monthGroups.find(group => group.month === month))
      .filter((group): group is MonthGroup => !!group);
  }

  // Estructura de meses y categorías (EJEMPLO, personaliza según tu info)
  monthGroups: MonthGroup[] = [
    {
      month: 'MES DE JUNIO',
      categories: [
        {
          name: 'Créditos',
          images: [
            {
              imageUrl: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/09/SOAY-T-RTM.jpeg',
              altText: 'Créditos',
              description: 'Conoce las opciones de crédito con tasas preferenciales que tenemos para ti. ¡Cumple tus sueños!'
            }
          ]
        },
        {
          name: 'Ahorro',
          images: [
            {
              imageUrl: 'https://www.bbva.com/wp-content/uploads/2019/07/ahorro-dinero-bbva-1024x629.jpg',
              altText: 'Charla de Ahorro',
              description: 'Aprende a gestionar tus finanzas personales y a planificar tu futuro con nuestra charla sobre la importancia del ahorro.'
            }
          ]
        }
      ]
    },
    {
      month: 'MES DE JULIO',
      categories: [
        {
          name: 'Próximamente',
          images: [
            {
              imageUrl: '',
              altText: 'Próximamente eventos!',
              description: 'Próximamente actividades'
            }
          ]
        }
      ]
    }
  ];

  benefitButtons: BenefitButton[] = [
    { icon: 'stairs', text: 'Escala Salarial', modalData: { title: 'Escala Salarial', text: 'Conoce nuestra estructura de escala salarial, diseñada para promover el crecimiento y reconocer tu desarrollo profesional dentro de la compañía.', icon: 'stairs' }, action: (data) => this.openInfoModal(data!) },
    { icon: 'directions_car', text: 'SOAT y RTM', modalData: { title: 'SOAT y RTM', text: 'Financia el SOAT y la Revisión Tecnicomecánica de tu vehículo a través de la cooperativa con tasas de interés preferenciales.', icon: 'directions_car' }, action: (data) => this.openInfoModal(data!) },
    { icon: 'phone_android', text: 'Celulares Corporativos', modalData: { title: 'Celulares Corporativos', text: 'Accede a planes de telefonía móvil corporativos con excelentes tarifas y beneficios para ti y tu familia.', icon: 'phone_android' }, action: (data) => this.openInfoModal(data!) },
    { icon: 'house', text: 'Asesoría en Vivienda', modalData: { title: 'Asesoría en Vivienda', text: 'Te brindamos acompañamiento y asesoría para que puedas cumplir el sueño de tener casa propia a través de nuestros convenios.', icon: 'house' }, action: (data) => this.openInfoModal(data!) },
    { icon: 'add_circle', text: 'Más Convenios', action: () => this.navigateTo('/agreement') }
  ];

  constructor(private router: Router) { }

  openInfoModal(data: ModalContent): void {
    this.selectedModalContent = data;
    this.isInfoModalVisible = true;
    this.isModalClosing = false;
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

  // Modal de imagen
  openImageModal(img: { imageUrl: string; altText: string; description: string }) {
    this.selectedImage = img;
    this.isModalClosing = false;
  }

  closeImageModal() {
    this.isModalClosing = true;
    setTimeout(() => {
      this.isModalClosing = false;
      this.selectedImage = null;
    }, 300);
  }

  // Carrusel
  scrollCarousel(container: HTMLElement, direction: 'left' | 'right') {
    const scrollAmount = 350; // igual al ancho de la imagen
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
