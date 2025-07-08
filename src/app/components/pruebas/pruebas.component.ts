// ... existing imports ...
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss'],
})
export class PruebasComponent {
  loading = false;
  showGif = true;
  gifKey = 0;

  showLoader() {
    this.loading = true;
    this.loopGif();
    setTimeout(() => {
      this.loading = false;
    }, 6000); // El loader estará activo 6 segundos (ajusta a tu gusto)
  }

  loopGif() {
    if (!this.loading) return;
    this.showGif = false;
    setTimeout(() => {
      this.gifKey++;
      this.showGif = true;
      // El tiempo debe ser igual a la duración del GIF (por ejemplo, 2s)
      setTimeout(() => this.loopGif(), 2000); // 2000ms = 2s, ajusta según tu GIF
    }, 300); // 300ms oculto para reiniciar el GIF
  }
}