import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para la navegación

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
  navegarA(seccion: string): void {
    // Muestra en la consola del navegador qué sección se ha clicado
    console.log(`El usuario quiere navegar a la sección: ${seccion}`);

    // EJEMPLO DE NAVEGACIÓN REAL:
    if (seccion === 'explorar') {
      // Navegar a una página general de bienvenida o de servicios
      // this.router.navigate(['/servicios']);
    } else {
      // Navegar a la sección específica del bienestar
      // this.router.navigate([`/bienestar-${seccion}`]);
    }
  }
}
