import { Component, AfterViewInit, OnDestroy, ElementRef, QueryList, ViewChildren, Renderer2, HostListener } from '@angular/core';

// Definimos una interfaz para la estructura de cada convenio
export interface Agreement {
  name: string;
  logoUrl: string;
  shortDescription: string;
  details: string; // Descripción más larga para el modal
  terms: string;   // Términos y condiciones
  contact: string; // Información de contacto
}

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements AfterViewInit, OnDestroy {

  @ViewChildren('carouselTrack') carouselTracks!: QueryList<ElementRef>;

  // Variables para controlar el modal
  isModalVisible = false;
  selectedAgreement: Agreement | null = null;
  isModalClosing = false; 
  // Lógica de los carruseles
  private scrollPositions: number[] = [];
  private autoScrollIntervals: any[] = [];
  private itemWidth = 180;

  // --- MODELO DE DATOS COMPLETO PARA LOS CONVENIOS ---
  
  bienestarFisico: Agreement[] = [
    { name: 'EMI', logoUrl: './assets/images/Convenios/BienestarFisico/emi.png', shortDescription: 'Atención médica domiciliaria.', details: 'Atención de emergencias y urgencias médicas, orientación médica a domicilio, video consulta, chat o telefónica; entre otros.', terms: 'Comunicate con el area de Cultura y Desarrollo', contact: 'Llama a la línea de atención nacional de EMI.' },
    { name: 'Futbol Comfandi', logoUrl: './assets/images/Convenios/BienestarFisico/futconfandi.png', shortDescription: 'Escuela de formación deportiva.', details: 'Inscribe a tus hijos en la escuela de fútbol de Comfandi con un 20% de descuento en la mensualidad.', terms: 'Aplica para hijos de colaboradores entre 5 y 15 años.', contact: 'Inscripciones directamente en las sedes de Comfandi.' },
    { name: 'Karate Comfandi', logoUrl: './assets/images/Convenios/BienestarFisico/karateconfandi.png', shortDescription: 'Clases de Karate-Do.', details: 'Desarrolla la disciplina y el autocontrol con clases de Karate-Do. 15% de descuento en la mensualidad.', terms: 'Aplica para todas las edades.', contact: 'Consulta horarios en las sedes de Comfandi.' },
    { name: 'Natación Comfandi', logoUrl: './assets/images/Convenios/BienestarFisico/natacionconfandi.png', shortDescription: 'Cursos de natación.', details: 'Aprende a nadar o perfecciona tu técnica con nuestros cursos. Descuento del 15% para colaboradores.', terms: 'Válido en los centros recreativos de Comfandi.', contact: 'Inscríbete en el punto de atención de cada centro.' },
    { name: 'Óptica Su Crédito', logoUrl: './assets/images/Convenios/BienestarFisico/opticasucredito.png', shortDescription: 'Descuentos en lentes y monturas.', details: 'Cuida tu salud visual con un 25% de descuento en monturas y un 15% en lentes formulados.', terms: 'Presenta tu carné de empleado. No acumulable.', contact: 'Visita cualquiera de las sedes de Óptica Su Crédito.' },
    { name: 'Rehabilita', logoUrl: './assets/images/Convenios/BienestarFisico/rehabilita.png', shortDescription: 'Terapias de rehabilitación.', details: 'Accede a terapias físicas y de rehabilitación con tarifas preferenciales para colaboradores.', terms: 'Requiere remisión médica para algunas terapias.', contact: 'Agenda tu cita a través de la línea de atención de Rehabilita.' },
    { name: 'Smart Fit', logoUrl: './assets/images/Convenios/BienestarFisico/smart.png', shortDescription: 'Gimnasio y entrenamiento.', details: '20% de descuento en el plan Black para entrenar en cualquier sede del país sin restricciones.', terms: 'Válido para colaboradores y un beneficiario.', contact: 'Inscríbete en el portal de beneficios con tu código de empleado.' },
    { name: 'Tenis Comfandi', logoUrl: './assets/images/Convenios/BienestarFisico/tenis.png', shortDescription: 'Clases y alquiler de canchas.', details: 'Descuento del 15% en clases de tenis y alquiler de canchas en los centros recreativos.', terms: 'Sujeto a disponibilidad de horarios.', contact: 'Reserva directamente en el centro recreativo de tu preferencia.' },
  ];

  bienestarEducativo: Agreement[] = [
    { name: 'CECEP', logoUrl: './assets/images/Convenios/BienestarEducativo/cecep.png', shortDescription: 'Descuentos en programas técnicos.', details: 'Obtén un 15% de descuento en el valor de la matrícula para programas técnicos y tecnológicos.', terms: 'Aplica para el primer semestre de nuevos estudiantes.', contact: 'Contacta a la oficina de admisiones del CECEP.' },
    { name: 'USC', logoUrl: './assets/images/Convenios/BienestarEducativo/usc.jpg', shortDescription: 'Descuentos en pregrado y posgrado.', details: 'La Universidad Santiago de Cali ofrece un 10% de descuento en matrículas de pregrado y posgrado.', terms: 'El descuento está sujeto al rendimiento académico.', contact: 'Consulta con el departamento de convenios de la USC.' },
    { name: 'CEIPA', logoUrl: './assets/images/Convenios/BienestarEducativo/ceipa.png', shortDescription: 'Beneficios en educación superior.', details: 'Descuentos especiales en programas de pregrado y posgrado bajo la modalidad virtual.', terms: 'Aplica para colaboradores y su núcleo familiar.', contact: 'Contacta al asesor asignado para la empresa.' },
    { name: 'Formarte', logoUrl: './assets/images/Convenios/BienestarEducativo/formate.png', shortDescription: 'Preparación para pruebas de estado.', details: '15% de descuento en cursos de preparación para las pruebas Saber 11 y Saber Pro.', terms: 'Válido para familiares de colaboradores.', contact: 'Menciona el convenio al momento de la inscripción.' },
    { name: 'Javeriana', logoUrl: './assets/images/Convenios/BienestarEducativo/javeriana.png', shortDescription: 'Descuento en educación continua.', details: '10% de descuento en la oferta de cursos y diplomados de educación continua de la universidad.', terms: 'No aplica para programas de posgrado.', contact: 'Revisa el catálogo en la página de la universidad.' },
    { name: 'UNAD', logoUrl: './assets/images/Convenios/BienestarEducativo/unad.jpg', shortDescription: 'Educación a distancia.', details: 'Descuentos especiales en programas de la Universidad Nacional Abierta y a Distancia.', terms: 'Consulta la oferta académica y los descuentos aplicables.', contact: 'Visita el portal de convenios de la UNAD.' },
    { name: 'Uniminuto', logoUrl: './assets/images/Convenios/BienestarEducativo/uniminuto.png', shortDescription: 'Facilidades en educación superior.', details: 'Descuentos en matrícula y programas de financiación para estudiar en Uniminuto.', terms: 'Aplica para colaboradores y su núcleo familiar.', contact: 'Contacta a la oficina de admisiones.' },
  ];

  bienestarMental: Agreement[] = [
    { name: 'Alkosto', logoUrl: './assets/images/Convenios/BienestarMental/alkosto.png', shortDescription: 'Descuentos en compras.', details: 'Obtén descuentos especiales en categorías seleccionadas para mejorar tu hogar y bienestar.', terms: 'Válido en fechas específicas. Consulta el calendario de beneficios.', contact: 'Presenta tu carné de empleado en el punto de pago.' },
    { name: 'Aviatur', logoUrl: './assets/images/Convenios/BienestarMental/aviatur.png', shortDescription: 'Planes de viaje y turismo.', details: 'Tarifas preferenciales en tiquetes aéreos, hoteles y paquetes turísticos para tus vacaciones.', terms: 'Sujeto a disponibilidad y temporada.', contact: 'Contacta al asesor de viajes de Aviatur asignado.' },
    { name: 'Comfandi', logoUrl: './assets/images/Convenios/BienestarMental/confandi.jpg', shortDescription: 'Acceso a recreación y cultura.', details: 'Disfruta de tarifas de afiliado para acceso a centros recreativos, eventos culturales y deportivos.', terms: 'Presenta tu carné de empleado y documento de identidad.', contact: 'Válido en todos los centros recreativos de Comfandi.' },
    { name: 'Mary', logoUrl: './assets/images/Convenios/BienestarMental/mary.png', shortDescription: 'Productos de belleza y cuidado personal.', details: '20% de descuento en productos de la marca Mary para tu cuidado personal y bienestar.', terms: 'Válido únicamente en tiendas autorizadas.', contact: 'Menciona el convenio al momento de pagar.' },
    { name: 'Popsy', logoUrl: './assets/images/Convenios/BienestarMental/popsy.png', shortDescription: 'Descuentos en heladería.', details: 'Disfruta de un 2x1 en conos de helado de un sabor los días martes y jueves.', terms: 'No aplica para días festivos.', contact: 'Presenta tu carné en cualquier heladería Popsy.' },
    { name: 'Surtifamiliar', logoUrl: './assets/images/Convenios/BienestarMental/surti.png', shortDescription: 'Descuentos en mercado.', details: '5% de descuento en el total de tu compra los días miércoles.', terms: 'No aplica para licores ni cigarrillos.', contact: 'Presenta tu carné de empleado en el punto de pago.' },
    { name: 'Templo de la Moda', logoUrl: './assets/images/Convenios/BienestarMental/templo.png', shortDescription: 'Descuentos en moda.', details: '10% de descuento en todas las prendas de vestir de las últimas colecciones.', terms: 'No acumulable con otras promociones o descuentos.', contact: 'Válido en todas las tiendas a nivel nacional.' },
    { name: 'El Variado', logoUrl: './assets/images/Convenios/BienestarMental/variado.png', shortDescription: 'Descuentos en almacenes.', details: 'Accede a un 5% de descuento en productos seleccionados de las tiendas El Variado.', terms: 'Consulta las categorías que aplican en el punto de información.', contact: 'Presenta tu carné de empleado.' },
  ];

  bienestarFinanciero: Agreement[] = [
    { name: 'Colpensiones', logoUrl: './assets/images/Convenios/BienestarFinanciero/colpensiones.png', shortDescription: 'Asesoría pensional.', details: 'Accede a jornadas de asesoría pensional y programas de ahorro para asegurar tu futuro.', terms: 'Requiere inscripción previa en las jornadas programadas.', contact: 'Consulta las fechas con el área de Cultura y Desarrollo.' },
    { name: 'Porvenir', logoUrl: './assets/images/Convenios/BienestarFinanciero/porvenir.jpeg', shortDescription: 'Asesoría en cesantías y pensiones.', details: 'Asesoría personalizada en el manejo de tus cesantías y pensiones voluntarias.', terms: 'Beneficio exclusivo para afiliados a Porvenir.', contact: 'Agenda una cita con tu asesor de Porvenir.' },
    { name: 'SuCrédito', logoUrl: './assets/images/Convenios/BienestarFinanciero/sucredito.png', shortDescription: 'Créditos por libranza.', details: 'Accede a créditos de libranza con tasas de interés preferenciales y plazos flexibles.', terms: 'Sujeto a estudio y aprobación de crédito.', contact: 'Contacta al ejecutivo de cuenta de SuCrédito.' },
    { name: 'FNA', logoUrl: './assets/images/Convenios/BienestarFinanciero/fna.webp', shortDescription: 'Ahorro para vivienda y educación.', details: 'Facilidades y tasas preferenciales para créditos de vivienda y educación a través del Fondo Nacional del Ahorro.', terms: 'Requiere afiliación y cumplimiento de requisitos del FNA.', contact: 'Visita la página web del FNA para más información.' },
  ];

  // Duplicamos los arrays para el efecto de bucle infinito (excepto el último)
  bienestarFisicoTrack = [...this.bienestarFisico, ...this.bienestarFisico];
  bienestarEducativoTrack = [...this.bienestarEducativo, ...this.bienestarEducativo];
  bienestarMentalTrack = [...this.bienestarMental, ...this.bienestarMental];
  // El financiero no se duplica porque no tiene auto-scroll

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    if (this.carouselTracks) {
      this.carouselTracks.forEach((trackRef, index) => {
        this.scrollPositions[index] = 0;
        if (index < 3) {
          this.startAutoScroll(index);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.autoScrollIntervals.forEach(interval => clearInterval(interval));
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    // Cierra el modal si está visible y no está en proceso de cierre
    if (this.isModalVisible && !this.isModalClosing) {
      this.closeModal();
    }
  }

  openAgreementModal(agreement: Agreement): void {
    this.selectedAgreement = agreement;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalClosing = true; // 1. Activa la animación de cierre

    // 2. Espera a que termine la animación (300ms) antes de ocultar el modal
    setTimeout(() => {
      this.isModalVisible = false;
      this.isModalClosing = false; // Resetea el estado
      this.selectedAgreement = null;
    }, 300);
  }

  startAutoScroll(carouselIndex: number): void {
    if (this.autoScrollIntervals[carouselIndex]) return;
    this.autoScrollIntervals[carouselIndex] = setInterval(() => { this.moveCarousel(carouselIndex, 1); }, 35);
  }
  
  pauseAutoScroll(carouselIndex: number): void {
    clearInterval(this.autoScrollIntervals[carouselIndex]);
    this.autoScrollIntervals[carouselIndex] = null;
  }

  private moveCarousel(carouselIndex: number, pixelsToMove: number): void {
    const track = this.carouselTracks.toArray()[carouselIndex].nativeElement as HTMLElement;
    const singleSetWidth = track.scrollWidth / 2;
    let currentPosition = this.scrollPositions[carouselIndex] + pixelsToMove;
    if (currentPosition >= singleSetWidth) {
        this.renderer.setStyle(track, 'transition', 'none');
        this.renderer.setStyle(track, 'transform', `translateX(0px)`);
        currentPosition = 0;
        setTimeout(() => { this.renderer.setStyle(track, 'transition', 'transform 0.5s ease-in-out'); }, 50);
    } else {
         this.renderer.setStyle(track, 'transform', `translateX(-${currentPosition}px)`);
    }
    this.scrollPositions[carouselIndex] = currentPosition;
  }

  scroll(carouselIndex: number, direction: 'prev' | 'next'): void {
    const track = this.carouselTracks.toArray()[carouselIndex].nativeElement as HTMLElement;
    const scrollAmount = this.itemWidth * 2;
    const maxScroll = track.scrollWidth - track.parentElement!.clientWidth;

    if (direction === 'next') {
        let newPosition = this.scrollPositions[carouselIndex] + scrollAmount;
        this.scrollPositions[carouselIndex] = newPosition > maxScroll ? maxScroll : newPosition;
    } else {
        let newPosition = this.scrollPositions[carouselIndex] - scrollAmount;
        this.scrollPositions[carouselIndex] = newPosition < 0 ? 0 : newPosition;
    }
    this.renderer.setStyle(track, 'transform', `translateX(-${this.scrollPositions[carouselIndex]}px)`);
  }
}
