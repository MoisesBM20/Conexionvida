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
  selector: 'app-beducational',
  templateUrl: './beducational.component.html',
  styleUrls: ['./beducational.component.scss']
})
export class BEducationalComponent {
  isInfoModalVisible = false;
  isModalClosing = false;
  selectedModalContent: ModalContent | null = null;

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

  monthGroups: MonthGroup[] = [
    {
      month: 'MES DE JUNIO',
      categories: [
        {
          name: 'Convenios',
          images: [
            {
              imageUrl: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/09/NUEVO-CONVENIO.png',
              altText: 'Convenio Uniminuto',
              description: '¡Tenemos un nuevo convenio con Uniminuto! Accede a descuentos especiales en programas de pregrado y posgrado para ti y tu familia.'
            }
          ]
        }
      ]
    },
    {
      month: 'MES DE JULIO',
      categories: [
        {
          name: 'Charlas',
          images: [
            {
              imageUrl: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/09/signal-2024-11-09-112137_005-768x512.jpeg',
              altText: 'Charla de Liderazgo',
              description: 'Participa en nuestra próxima charla sobre liderazgo y desarrollo de habilidades gerenciales. ¡Potencia tu carrera con nosotros!'
            }
          ]
        }
      ]
    }
  ];

  benefitButtons: BenefitButton[] = [
    { icon: 'school', text: 'Formación y/o Capacitación', modalData: { title: 'Formación y Capacitación', text: 'Accede a nuestro plan anual de formación con cursos, talleres y diplomados para potenciar tus habilidades técnicas y blandas.', icon: 'school' }, action: (data) => this.openInfoModal(data!) },
    { icon: 'cast_for_education', text: 'Apoyos Educativos', modalData: { title: 'Apoyos Educativos', text: 'Ofrecemos auxilios económicos para matrículas de pregrado, posgrado e idiomas para ti y tus hijos.', icon: 'cast_for_education' }, action: (data) => this.openInfoModal(data!) },
    { icon: 'military_tech', text: 'Bono Graduando', modalData: { title: 'Bono Graduando', text: '¡Celebramos tus logros! Recibe un bono de reconocimiento al graduarte de tu programa técnico, tecnológico o profesional.', icon: 'military_tech' }, action: (data) => this.openInfoModal(data!) },
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

  scrollCarousel(container: HTMLElement, direction: 'left' | 'right') {
    const scrollAmount = 350;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
