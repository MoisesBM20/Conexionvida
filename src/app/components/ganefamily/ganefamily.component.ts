import { Component, ViewChildren, QueryList, ElementRef, Renderer2, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Interfaces para la estructura de datos
export interface Video {
  title: string;
  thumbnailUrl: string;
  youtubeId: string;
  isPlaying?: boolean;
  safeUrl?: SafeResourceUrl;
}

export interface Photo {
  id: number;
  url: string;
  alt: string;
}

@Component({
  selector: 'app-ganefamily',
  templateUrl: './ganefamily.component.html',
  styleUrls: ['./ganefamily.component.scss']
})
export class GanefamilyComponent {
  
  @ViewChildren('photoTrack') photoTrack!: QueryList<ElementRef>;
  
  // --- Lógica para el carrusel de fotos ---
  private isDragging = false;
  private hasDragged = false; // Flag para diferenciar clic de arrastre
  private startX = 0;
  private scrollLeft = 0;
  
  // --- Lógica para modales y datos ---
  isImageModalVisible = false;
  selectedImageUrl: string | null = null;
  
  photos: Photo[] = [
    { id: 1, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/1-644x429.jpeg', alt: 'Foto Familia 1' },
    { id: 2, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/2-644x429.jpeg', alt: 'Foto Familia 2' },
    { id: 3, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/3-644x429.jpeg', alt: 'Foto Familia 3' },
    { id: 4, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/4-644x429.jpeg', alt: 'Foto Familia 4' },
    { id: 5, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/5-644x429.jpeg', alt: 'Foto Familia 5' },
    { id: 6, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/6-644x429.jpeg', alt: 'Foto Familia 6' },
    { id: 7, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/7-644x429.jpeg', alt: 'Foto Familia 6' },
    { id: 8, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/8-644x429.jpeg', alt: 'Foto Familia 6' },
    { id: 9, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/9-644x429.jpeg', alt: 'Foto Familia 6' },
    { id: 10, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/10-644x429.jpeg', alt: 'Foto Familia 6' },
    { id: 11, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/14-644x429.jpeg', alt: 'Foto Familia 6' },
    { id: 12, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/15-644x429.jpeg', alt: 'Foto Familia 6' },
    { id: 13, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2024/11/16-644x429.jpeg', alt: 'Foto Familia 6' },

  ];
  
  videos: Video[] = [
    { title: 'Día de la Familia 2023', youtubeId: '_rAw5_jeZX0', thumbnailUrl: 'https://youtu.be/_rAw5_jeZX0' },
    { title: 'Celebración de Fin de Año', youtubeId: '6gKV1zD-Arw', thumbnailUrl: 'https://youtu.be/6gKV1zD-Arw' },
    { title: 'Actividades para Niños', youtubeId: 't4gjl-uw28g', thumbnailUrl: 'https://img.youtube.com/vi/t4gjl-uw28g/hqdefault.jpg' }
  ];

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) { }

  // --- Lógica del carrusel de fotos ---
  scrollPhotos(direction: 'prev' | 'next'): void {
    const track = this.photoTrack.first.nativeElement;
    const scrollAmount = track.querySelector('.photo-gallery-item')?.clientWidth * 2;
    track.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  }

  onMouseDown(event: MouseEvent, track: HTMLElement): void {
    this.isDragging = true;
    this.hasDragged = false; // Resetea el flag al iniciar el clic
    this.startX = event.pageX - track.offsetLeft;
    this.scrollLeft = track.scrollLeft;
    this.renderer.addClass(track, 'is-dragging');
  }

  onMouseLeave(track: HTMLElement): void {
    this.isDragging = false;
    this.renderer.removeClass(track, 'is-dragging');
  }

  onMouseUp(): void {
    this.isDragging = false;
    this.renderer.removeClass(this.photoTrack.first.nativeElement, 'is-dragging');
  }

  onMouseMove(event: MouseEvent, track: HTMLElement): void {
    if (!this.isDragging) return;
    this.hasDragged = true; // Si el mouse se mueve, es un arrastre
    event.preventDefault();
    const x = event.pageX - track.offsetLeft;
    const walk = (x - this.startX) * 2;
    track.scrollLeft = this.scrollLeft - walk;
  }
  
  // --- Lógica para reproducción de videos ---
  playVideo(clickedVideo: Video): void {
    if (!clickedVideo.safeUrl) {
      clickedVideo.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${clickedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`);
    }
    this.videos.forEach(video => {
      video.isPlaying = (video === clickedVideo);
    });
  }

  // --- ✨ Lógica para el modal de imagen (con chequeo de arrastre) ---
  onItemClick(imageUrl: string): void {
    // Solo abre el modal si no se estaba arrastrando
    if (!this.hasDragged) {
      this.selectedImageUrl = imageUrl;
      this.isImageModalVisible = true;
    }
  }

  closeImageModal(): void {
    this.isImageModalVisible = false;
    setTimeout(() => { this.selectedImageUrl = null; }, 300);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isImageModalVisible) {
      this.closeImageModal();
    }
  }
}
