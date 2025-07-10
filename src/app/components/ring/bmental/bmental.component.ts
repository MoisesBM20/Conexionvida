import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Interfaz para las publicaciones del mes
export interface TimelinePost {
  date: string;
  imageUrl: string;
  altText: string;
  description: string;
}
export interface BenefitButton {
  icon: string;
  text: string;
  action: () => void; // Define una acción para cada botón
}
export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface Category {
  name: string;
  images: { imageUrl: string; altText: string; description: string }[];
}

interface MonthGroup {
  month: string;
  categories: Category[];
}

@Component({
  selector: 'app-bmental',
  templateUrl: './bmental.component.html',
  styleUrls: ['./bmental.component.scss']
})
export class BMentalComponent {

  isInfoModalVisible = false;
  isModalClosing = false; 
  modalContent = { title: '', text: '', icon: '' };

  // 1. Agrega el array de meses
  private monthOrder = [
    'MES DE ENERO', 'MES DE FEBRERO', 'MES DE MARZO', 'MES DE ABRIL',
    'MES DE MAYO', 'MES DE JUNIO', 'MES DE JULIO', 'MES DE AGOSTO',
    'MES DE SEPTIEMBRE', 'MES DE OCTUBRE', 'MES DE NOVIEMBRE', 'MES DE DICIEMBRE'
  ];

  // 2. Getter para el mes actual
  get currentMonth(): string {
    return this.monthOrder[new Date().getMonth()];
  }

  // 3. Getter para el mes anterior
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
          name: 'SUCREDITO',
          images: [
            {
              imageUrl: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/09/DIANA-JULI-ESPERANZA-644x446.jpg',
              altText: 'Auxilio óptico',
              description: 'Testimonio de beneficiarias del programa de bienestar mental.'
            },
            {
              imageUrl: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/09/MACKYNG-644x446.jpg',
              altText: 'Auxilio economico',
              description: 'Participación en actividades de bienestar mental.'
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
              altText: 'Próximamente actividades!',
              description: 'Próximamente actividades'
            }
          ]
        }
      ]
    }
  ];

    // Datos para los botones de la barra lateral
    benefitButtons: BenefitButton[] = [
      { icon: 'cake', text: 'Cumpleaños', action: () => this.openInfoModal('Día de Cumpleaños', 'Disfruta de una tarde libre en el mes de tu cumpleaños para que celebres con los que más quieres.', 'cake') },
      { icon: 'family_restroom', text: 'Día de la Familia', action: () => this.openInfoModal('Día de la Familia', 'Un evento anual lleno de actividades, juegos y sorpresas para compartir y celebrar con toda tu familia.', 'family_restroom') },
      { icon: 'workspace_premium', text: 'Quinquenios', action: () => this.openInfoModal('Quinquenios', 'Reconocemos tu lealtad y compromiso con un bono especial cada vez que cumples 5 años en la compañía.', 'workspace_premium') },
      { icon: 'healing', text: 'Acompañamiento de Luto', action: () => this.openInfoModal('Acompañamiento de Luto', 'Te ofrecemos apoyo y un auxilio económico en los momentos difíciles por la pérdida de un ser querido.', 'healing') },
      { icon: 'card_giftcard', text: 'Kit de Bienvenida', action: () => this.openInfoModal('Kit de Bienvenida', 'Al ingresar a nuestra familia, recibirás un kit especial con todo lo que necesitas para empezar con la mejor energía.', 'card_giftcard') },
      { icon: 'local_shipping', text: 'Día de Mudanza', action: () => this.openInfoModal('Día de Mudanza', 'Te otorgamos un día libre remunerado para que puedas realizar tu trasteo con total tranquilidad.', 'local_shipping') },
      { icon: 'watch_later', text: 'Horario Flexible', action: () => this.openInfoModal('Horario Flexible', 'Consulta con tu líder la posibilidad de ajustar tu horario para un mejor balance entre tu vida personal y laboral.', 'watch_later') },
      { icon: 'coffee', text: 'Café con JJ', action: () => this.openInfoModal('Café con JJ', 'Un espacio cercano y directo para conversar con nuestro gerente general, resolver dudas y proponer ideas.', 'coffee') },
      { icon: 'checkroom', text: 'Entrega de Dotación', action: () => this.openInfoModal('Entrega de Dotación', 'Recibe tu dotación de uniformes y elementos de trabajo dos veces al año para que desempeñes tus labores cómodamente.', 'checkroom') },
      { icon: 'beach_access', text: 'Vacaciones', action: () => this.openInfoModal('Vacaciones', 'Disfruta de tus vacaciones legales remuneradas para que descanses y recargues energías.', 'beach_access') },
      { icon: 'add_circle', text: 'Más Convenios', action: () => this.navigateTo('/agreement') }
    ];
    constructor(private router: Router) { }
      // Lógica para el modal (puedes personalizarla para cada botón)
      openInfoModal(title: string, text: string, icon: string): void {
        this.modalContent = { title, text, icon };
        this.isInfoModalVisible = true;
        this.isModalClosing = false;
      }

  closeInfoModal(): void {
    this.isModalClosing = true;
    setTimeout(() => {
      this.isInfoModalVisible = false;
      this.isModalClosing = false;
    }, 300);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  selectedImage: { imageUrl: string; altText: string; description: string } | null = null;

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

  // Carrusel (igual que en bphysical)
  scrollCarousel(container: HTMLElement, direction: 'left' | 'right') {
    const scrollAmount = 350; // igual al ancho de la imagen
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}


