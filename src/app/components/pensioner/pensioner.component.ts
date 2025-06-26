import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';

export interface Pensioner {
  id: number;
  name: string;
  photoUrl: string;
  lastRole: string;
  yearsOfService: number;
  farewellMessage: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  alt: string;
}

@Component({
  selector: 'app-pensioner',
  templateUrl: './pensioner.component.html',
  styleUrls: ['./pensioner.component.scss']
})
export class PensionerComponent implements OnInit {

  // Referencia al contenedor de las miniaturas
  @ViewChild('thumbnailTrack') thumbnailTrack!: ElementRef;

  isModalVisible = false;
  selectedPensioner: Pensioner | null = null;
  isModalClosing = false;

  pensioners: Pensioner[] = [
    {
      id: 1,
      name: 'Carlos Rodríguez',
      photoUrl: './assets/images/personaje.png',
      lastRole: 'Gerente de Operaciones',
      yearsOfService: 35,
      farewellMessage: 'Agradecemos a Carlos por 35 años de dedicación incansable y liderazgo. Su visión y compromiso han sido pilares fundamentales para nuestro crecimiento. Le deseamos todo lo mejor en su nueva etapa.'
    },
    {
      id: 2,
      name: 'María Fernanda López',
      photoUrl: './assets/images/personaje.png',
      lastRole: 'Coordinadora Administrativa',
      yearsOfService: 28,
      farewellMessage: 'Gracias a María Fernanda por casi tres décadas de organización impecable y por ser el corazón de nuestro equipo administrativo. Su calidez y profesionalismo serán siempre recordados.'
    },
    {
      id: 3,
      name: 'Jorge Alberto Vélez',
      photoUrl: './assets/images/personaje.png',
      lastRole: 'Especialista Técnico',
      yearsOfService: 32,
      farewellMessage: 'Jorge nos deja un legado de innovación y excelencia técnica. Su capacidad para resolver los desafíos más complejos ha sido una inspiración para todos. ¡Disfruta de un merecido descanso!'
    },
    {
      id: 3,
      name: 'Jorge Alberto Vélez',
      photoUrl: './assets/images/personaje.png',
      lastRole: 'Especialista Técnico',
      yearsOfService: 32,
      farewellMessage: 'Jorge nos deja un legado de innovación y excelencia técnica. Su capacidad para resolver los desafíos más complejos ha sido una inspiración para todos. ¡Disfruta de un merecido descanso!'
    },
    {
      id: 3,
      name: 'Jorge Alberto Vélez',
      photoUrl: './assets/images/personaje.png',
      lastRole: 'Especialista Técnico',
      yearsOfService: 32,
      farewellMessage: 'Jorge nos deja un legado de innovación y excelencia técnica. Su capacidad para resolver los desafíos más complejos ha sido una inspiración para todos. ¡Disfruta de un merecido descanso!'
    },
    {
      id: 3,
      name: 'Jorge Alberto Vélez',
      photoUrl: './assets/images/personaje.png',
      lastRole: 'Especialista Técnico',
      yearsOfService: 32,
      farewellMessage: 'Jorge nos deja un legado de innovación y excelencia técnica. Su capacidad para resolver los desafíos más complejos ha sido una inspiración para todos. ¡Disfruta de un merecido descanso!'
    },
    {
      id: 3,
      name: 'Jorge Alberto Vélez',
      photoUrl: './assets/images/personaje.png',
      lastRole: 'Especialista Técnico',
      yearsOfService: 32,
      farewellMessage: 'Jorge nos deja un legado de innovación y excelencia técnica. Su capacidad para resolver los desafíos más complejos ha sido una inspiración para todos. ¡Disfruta de un merecido descanso!'
    },
    
  ];

  galleryImages: GalleryImage[] = [
    { id: 1, url: 'assets/images/Pensioner/pensioner1.jpg', alt: 'Foto del evento 1' },
    { id: 2, url: 'https://placehold.co/800x600/e74c3c/ffffff?text=Evento+2', alt: 'Foto del evento 2' },
    { id: 3, url: 'https://placehold.co/800x600/2ecc71/ffffff?text=Evento+3', alt: 'Foto del evento 3' },
    { id: 4, url: 'https://placehold.co/800x600/f1c40f/ffffff?text=Evento+4', alt: 'Foto del evento 4' },
    { id: 5, url: 'https://placehold.co/800x600/9b59b6/ffffff?text=Evento+5', alt: 'Foto del evento 5' },
    { id: 6, url: 'https://placehold.co/800x600/1abc9c/ffffff?text=Evento+6', alt: 'Foto del evento 6' },
  ];
  
  selectedGalleryImage: GalleryImage | null = null;

  constructor() { }

  ngOnInit(): void {
    if (this.galleryImages.length > 0) {
      this.selectedGalleryImage = this.galleryImages[0];
    }
  }

  // --- Lógica del Modal ---
  openModal(pensioner: Pensioner): void {
    this.selectedPensioner = pensioner;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalClosing = true;
    setTimeout(() => {
      this.isModalVisible = false;
      this.isModalClosing = false;
      this.selectedPensioner = null;
    }, 300);
  }

  // --- Lógica de la Galería ---
  selectImage(image: GalleryImage): void {
    this.selectedGalleryImage = image;
  }

  // Función para mover las miniaturas
  scrollThumbnails(direction: 'prev' | 'next'): void {
    const track = this.thumbnailTrack.nativeElement;
    // Mueve el carrusel la mitad de su ancho visible
    const scrollAmount = track.clientWidth / 2;
    track.scrollBy({
        left: direction === 'prev' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isModalVisible) {
      this.closeModal();
    }
  }
}
