import { Component } from '@angular/core';
import { Router ,} from '@angular/router'; // Importa el Router para la navegación

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  // Inyecta el Router en el constructor para poder usarlo
  constructor(private router: Router) { }

  /**
   * Esta función se ejecuta cuando el usuario hace clic en una zona de la rueda o un botón.
   * @param seccion El nombre de la sección clicada ('fisico', 'mental', 'explorar', etc.).
   */

  carouselItems = [
    {
      img: 'assets/images/atraccion/Promociones/prom1.png',
      title: 'Promoción Especial',
      description: 'Aprovecha nuestras promociones exclusivas para este mes.',
      link: 'https://www.ejemplo.com/promocion'
    },
    {
      img: 'assets/images/atraccion/Vacantes/facilitador.jpeg',
      title: 'Vacante: Facilitador',
      description: 'Únete a nuestro equipo como facilitador y crece profesionalmente.',
      link: 'https://www.ejemplo.com/vacantes'
    },
    {
      img: 'assets/images/atraccion/Vacantes/liderventas.jpeg',
      title: 'Vacante: Líder de Ventas',
      description: 'Buscamos líderes apasionados para nuestro equipo de ventas.',
      link: ''
    }
  ];
  currentSlide = 0;

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.carouselItems.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  
  navegarA(seccion: string): void {
    // Muestra en la consola del navegador qué sección se ha clicado
    console.log(`El usuario quiere navegar a la sección: ${seccion}`);

    // 
    if (seccion === 'explorar') {
      // Navegar a una página general de bienvenida o de servicios
      // this.router.navigate(['/servicios']);
    } else {
      // Navegar a la sección específica del bienestar
      // this.router.navigate([`/bienestar-${seccion}`]);
    }
  }
}
