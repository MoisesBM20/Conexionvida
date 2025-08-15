import { Component, OnInit } from '@angular/core';

// Estructura para los datos de cada vacante
export interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  postedTime: string;
  imageUrl: string;
  description:string;
  requirements: string[];
  otherInfo: string[];
  contactEmail: string;
}

// Estructura para los datos de cada persona promovida
export interface PromotionPerson {
  id: number;
  name: string;
  previousRole: string;
  newRole: string;
  imageUrl: string;
}

// Estructura para agrupar promociones por período (quincena)
export interface PromotionPeriod {
  id: number;
  periodName: string; // "Primera Quincena de Julio", "Segunda Quincena de Junio", etc.
  periodImageUrl: string; // URL de la imagen que representa a todos los promovidos de esa quincena
  promotedPeople: PromotionPerson[];
}


@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.scss']
})
export class AttractionComponent implements OnInit {

  activeView: 'vacancies' | 'promotions' = 'vacancies';

  // --- MODELO DE DATOS DE VACANTES ---
  vacancies: Vacancy[] = [
    {
      id: 1,
      title: 'Líder de Ventas',
      company: 'Gane - SuperGIROS',
      location: 'Cali, Valle del Cauca',
      salary: '$1.959.000 - $2.526.000',
      postedTime: 'Publicado hoy',
      imageUrl: './assets/images/atraccion/Vacantes/facilitador.jpeg',
      description: 'Tu función será liderar, supervisar e implementar acciones para el cumplimiento de las metas de venta establecidas para la zona, realizando acompañamiento permanente y dando oportuna respuesta a las necesidades que se presenten en la operación.',
      requirements: [
        'Técnico, tecnólogo, profesional o estudiante activo a partir de 7° semestre de carreras administrativas, de mercadeo o afines.',
        'Mínimo un (1) año de experiencia en actividades comerciales y/o relacionadas con liderazgo de equipos, preferiblemente en empresas de consumo masivo.'
      ],
      otherInfo: [
        'Contrato a término indefinido.',
        'Debe de contar con moto y documentos al día.',
        'Licencia categoría A (1 o 2) y B (1 o 2).'
      ],
      contactEmail: 'mavalencia@gane.com.co'
    },
    {
      id: 2,
      title: 'Facilitador de Servicio al Cliente',
      company: 'Gane - SuperGIROS',
      location: 'Cali, Valle del Cauca',
      salary: '$1.606.000',
      postedTime: 'Publicado hoy',
      imageUrl: './assets/images/atraccion/Vacantes/facilitador.jpeg',
      description: 'Tu función será brindar un servicio con calidad a los clientes internos y externos de la compañía, dando respuestas oportunas y claras a las solicitudes realizadas por los diferentes canales de atención, con el fin de satisfacer sus necesidades, agregar valor y lograr su fidelidad.',
      requirements: [
        'Técnico en Servicio al Cliente, técnico en Auxiliar Administrativo o afín.',
        'Mínimo de (1) año de experiencia en áreas de servicio al cliente, recepción y gestión de PQRS.'
      ],
      otherInfo: [
        'Contrato a término indefinido.',
        'Residir en la ciudad de Cali.'
      ],
      contactEmail: 'mavalencia@gane.com.co'
    },
  ];

  // --- MODELO DE DATOS DE PROMOCIONES AGRUPADO POR PERÍODO ---
  promotionPeriods: PromotionPeriod[] = [
    {
      id: 1,
      periodName: 'Primera Quincena de Julio',
      periodImageUrl: 'https://placehold.co/800x500/005A9C/FFFFFF?text=Promovidos+Julio+Q1',
      promotedPeople: []
    },
    {
      id: 2,
      periodName: 'Segunda Quincena de Junio',
      periodImageUrl: 'https://placehold.co/800x500/00A9FF/FFFFFF?text=Promovidos+Junio+Q2',
      promotedPeople: []
    },
    {
      id: 3,
      periodName: 'Primera Quincena de Junio',
      periodImageUrl: 'https://placehold.co/800x500/00FFAA/FFFFFF?text=Promovidos+Junio+Q1',
      promotedPeople: []
    },
    {
      id: 4,
      periodName: 'Segunda Quincena de Mayo',
      periodImageUrl: 'https://placehold.co/800x500/FFAA00/FFFFFF?text=Promovidos+Mayo+Q2',
      promotedPeople: []
    },
    {
      id: 5,
      periodName: 'Primera Quincena de Mayo',
      periodImageUrl: 'https://placehold.co/800x500/AA00FF/FFFFFF?text=Promovidos+Mayo+Q1',
      promotedPeople: []
    },
  ];

  selectedVacancy: Vacancy | null = null;
  selectedPromotionPeriod: PromotionPeriod | null = null;
  
  isImageModalVisible = false;

  ngOnInit(): void {
    // Inicializa la vista con la primera vacante seleccionada por defecto
    
    if (this.vacancies.length > 0) {
      this.selectVacancy(this.vacancies[0]);
    }
  }

  selectVacancy(vacancy: Vacancy): void {
    this.selectedVacancy = vacancy;
    this.selectedPromotionPeriod = null; // Deselecciona cualquier período de promoción
  }

  selectPromotionPeriod(period: PromotionPeriod): void {
    this.selectedPromotionPeriod = period;
    this.selectedVacancy = null; // Deselecciona cualquier vacante
  }
  
  setView(view: 'vacancies' | 'promotions'): void {
    this.activeView = view;
    // Al cambiar de vista, selecciona el primer elemento de la lista correspondiente
    if (view === 'vacancies' && this.vacancies.length > 0) {
      this.selectVacancy(this.vacancies[0]);
    } else if (view === 'promotions' && this.promotionPeriods.length > 0) {
      this.selectPromotionPeriod(this.promotionPeriods[0]);
    }
  }

  // Funciones para abrir y cerrar el modal de la imagen de la vacante
  openImageModal(): void {
    if (this.selectedVacancy) {
        this.isImageModalVisible = true;
    }
  }

  closeImageModal(): void {
    this.isImageModalVisible = false;
  }
}
