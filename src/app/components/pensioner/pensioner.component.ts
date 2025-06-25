import { Component, HostListener } from '@angular/core';

// 1. Definimos una estructura para los datos de cada pensionado
export interface Pensioner {
  id: number;
  name: string;
  photoUrl: string;
  lastRole: string; // Último cargo en la empresa
  yearsOfService: number; // Años de servicio
  farewellMessage: string; // Mensaje de despedida o agradecimiento
}

@Component({
  selector: 'app-pensioner',
  templateUrl: './pensioner.component.html',
  styleUrls: ['./pensioner.component.scss']
})
export class PensionerComponent {

  // 2. Variables para controlar el modal
  isModalVisible = false;
  selectedPensioner: Pensioner | null = null;
  isModalClosing = false; // Para la animación de cierre

  // 3. Creamos una lista de pensionados de ejemplo
  pensioners: Pensioner[] = [
    {
      id: 1,
      name: 'Carlos Rodríguez',
      photoUrl: './assets/images/pensioners/pensioner1.jpg', // Ruta a tu imagen
      lastRole: 'Gerente de Operaciones',
      yearsOfService: 35,
      farewellMessage: 'Agradecemos a Carlos por 35 años de dedicación incansable y liderazgo. Su visión y compromiso han sido pilares fundamentales para nuestro crecimiento. Le deseamos todo lo mejor en su nueva etapa.'
    },
    {
      id: 2,
      name: 'María Fernanda López',
      photoUrl: './assets/images/pensioners/pensioner2.jpg', // Ruta a tu imagen
      lastRole: 'Coordinadora Administrativa',
      yearsOfService: 28,
      farewellMessage: 'Gracias a María Fernanda por casi tres décadas de organización impecable y por ser el corazón de nuestro equipo administrativo. Su calidez y profesionalismo serán siempre recordados.'
    },
    {
      id: 3,
      name: 'Jorge Alberto Vélez',
      photoUrl: './assets/images/pensioners/pensioner3.jpg', // Ruta a tu imagen
      lastRole: 'Especialista Técnico',
      yearsOfService: 32,
      farewellMessage: 'Jorge nos deja un legado de innovación y excelencia técnica. Su capacidad para resolver los desafíos más complejos ha sido una inspiración para todos. ¡Disfruta de un merecido descanso!'
    },
    // Puedes añadir más pensionados aquí
  ];


  constructor() { }

  // --- Lógica para el modal ---

  /**
   * Abre el modal con la información del pensionado seleccionado.
   * @param pensioner El objeto del pensionado en el que se hizo clic.
   */
  openModal(pensioner: Pensioner): void {
    this.selectedPensioner = pensioner;
    this.isModalVisible = true;
  }

  /**
   * Cierra el modal, activando la animación de salida.
   */
  closeModal(): void {
    this.isModalClosing = true;
    setTimeout(() => {
      this.isModalVisible = false;
      this.isModalClosing = false;
      this.selectedPensioner = null;
    }, 300); // Duración de la animación
  }

  /**
   * Escucha la tecla 'Escape' para cerrar el modal.
   * @param event El evento del teclado.
   */
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isModalVisible) {
      this.closeModal();
    }
  }
}
