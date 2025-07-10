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
  images: { url: string; titulo: string; descripcion: string; urlDestino?: string }[];
}

interface MonthGroup {
  month: string;
  categories: Category[];
}

@Component({
  selector: 'app-bphysical',
  templateUrl: './bphysical.component.html',
  styleUrls: ['./bphysical.component.scss']
})
export class BPhysicalComponent {

  isInfoModalVisible = false;
  isModalClosing = false; 

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
    // Filtrar y ordenar: actual primero, luego anterior
    return monthsToShow
      .map(month => this.monthGroups.find(group => group.month === month))
      .filter((group): group is MonthGroup => !!group);
  }

  // Nuevo modelo de datos agrupado por mes y categorías
  monthGroups: MonthGroup[] = [
    {
      month: 'MES DE JUNIO',
      categories: [
        {
          name: 'Actividad Física',
          images: [
            { url: 'assets/images/ring/Bphysical/correr.jpg', titulo: 'Carrera Saludable', descripcion: 'Participación en la carrera anual para promover la actividad física y el bienestar entre los colaboradores. ¡Corre y Gane!' },
            { url: 'assets/images/ring/Bphysical/zumba.jpg', titulo: 'Clase de Zumba', descripcion: 'Sesión de zumba dirigida por instructores certificados, fomentando la integración y la salud cardiovascular.' },
            { url: 'assets/images/ring/Bphysical/aereorumba.jpg', titulo: 'AeroRumba', descripcion: 'Clase de aerorumba para todos los niveles, promoviendo el ejercicio y la diversión.' },
          ]
        },
        {
          name: 'Reconocimiento especial',
          images: [
            { url: '', titulo: 'Entrega de ancheta', descripcion: 'Entrega de ancheta a colaboradores destacados por su esfuerzo y dedicación.'},
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
            { url: '', titulo: 'Próximamente', descripcion: 'Próximamente actividades' },
          ]
        }
      ]
    }
  ];

  benefitButtons: BenefitButton[] = [
    { icon: 'info', text: 'Detalle por Incapacidad', action: () => this.openInfoModal() },
    { icon: 'add_circle', text: 'Más Convenios', action: () => this.navigateTo('/agreement') }
  ];
  constructor(private router: Router) { }

  // --- Métodos para el Modal ---
  openInfoModal(): void {
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
  
  benefits: Benefit[] = [];

  selectedImage: { url: string; titulo: string; descripcion: string; urlDestino?: string } | null = null;

  openImageModal(img: { url: string; titulo: string; descripcion: string }) {
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

  // Para scroll del carrusel
  scrollCarousel(container: HTMLElement, direction: 'left' | 'right') {
    const scrollAmount = 350; // igual al ancho de la imagen
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }


}

