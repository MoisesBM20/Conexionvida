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
  description: string;
  requirements: string[];
  otherInfo: string[];
  contactEmail: string;
}

// Estructura para los datos de cada promoción
export interface Promotion {
  id: number;
  name: string;
  previousRole: string;
  newRole: string;
  imageUrl: string;
}

@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.scss']
})
export class AttractionComponent implements OnInit {

  activeView: 'vacancies' | 'promotions' = 'vacancies';

  // --- MODELO DE DATOS ACTUALIZADO ---
  vacancies: Vacancy[] = [
    {
      id: 1,
      title: 'Líder de Ventas',
      company: 'Gane - SuperGIROS',
      location: 'Cali, Valle del Cauca',
      salary: '$1.959.000 - $2.526.000',
      postedTime: 'Publicado hoy',
      imageUrl: './assets/images/atraccion/Vacantes/liderventas.jpeg',
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

  promotions: Promotion[] = [
    {
      id: 1,
      name: 'Brayan Estiven Caracas Filigrana',
      previousRole: 'Técnico de Soporte',
      newRole: 'Técnico de Comunicaciones',
      imageUrl: './assets/images/personaje.png'
    },
  ];

  selectedVacancy: Vacancy | null = null;
  selectedPromotion: Promotion | null = null;
  
  // Variable para controlar el modal de la imagen
  isImageModalVisible = false;

  ngOnInit(): void {
    if (this.vacancies.length > 0) {
      this.selectVacancy(this.vacancies[0]);
    }
  }

  selectVacancy(vacancy: Vacancy): void {
    this.selectedVacancy = vacancy;
    this.selectedPromotion = null;
  }

  selectPromotion(promotion: Promotion): void {
    this.selectedPromotion = promotion;
    this.selectedVacancy = null;
  }
  
  setView(view: 'vacancies' | 'promotions'): void {
    this.activeView = view;
    if (view === 'vacancies' && this.vacancies.length > 0) {
      this.selectVacancy(this.vacancies[0]);
    } else if (view === 'promotions' && this.promotions.length > 0) {
      this.selectPromotion(this.promotions[0]);
    }
  }

  // Funciones para abrir y cerrar el modal de la imagen
  openImageModal(): void {
    this.isImageModalVisible = true;
  }

  closeImageModal(): void {
    this.isImageModalVisible = false;
  }
}
