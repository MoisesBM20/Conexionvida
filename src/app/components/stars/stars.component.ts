import { Component, ViewChildren, QueryList, ElementRef, Renderer2, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Video {
  title: string;
  thumbnailUrl: string;
  youtubeId: string;
  isPlaying?: boolean;
  safeUrl?: SafeResourceUrl; // ✨ NUEVO: Almacena la URL segura para evitar recargas
}

export interface Photo {
  id: number;
  url: string;
  alt: string;
}

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {
  
  @ViewChildren('photoTrack') photoTrack!: QueryList<ElementRef>;
  
  // --- Lógica para el carrusel de fotos ---
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;
  
  // --- Lógica para modales y datos ---
  isImageModalVisible = false;
  selectedImageUrl: string | null = null;
  
  photos: Photo[] = [
    { id: 1, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2025/02/IMG_7844-644x429.jpg', alt: 'Foto 1' },
    { id: 2, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2025/02/IMG_7920-644x429.jpg', alt: 'Foto 2' },
    { id: 3, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2025/02/IMG_7961-644x429.jpg', alt: 'Foto 3' },
    { id: 4, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2025/02/IMG_7977-644x429.jpg', alt: 'Foto 4' },
    { id: 6, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2025/02/IMG_7660-644x429.jpg', alt: 'Foto 6' },
    { id: 7, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2025/02/IMG_7675-644x429.jpg', alt: 'Foto 7' },
    { id: 8, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2025/02/IMG_7714-644x429.jpg', alt: 'Foto 8' },
    { id: 9, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2025/02/DSC_7358-644x429.jpg', alt: 'Foto 9' },
    { id: 10, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2025/02/DSC_7448-644x429.jpg', alt: 'Foto 10' },
    { id: 11, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2025/02/IMG_7877-644x429.jpg', alt: 'Foto 11' },
    { id: 12, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2025/02/IMG_7941-644x429.jpg', alt: 'Foto 12' },
    { id: 13, url: 'http://intranet.gane.com.co/cultura-vida/wp-content/uploads/2025/02/DSC_7448-644x429.jpg', alt: 'Foto 13' }
 
  ];
  videos: Video[] = [
    { title: 'NOCHE DE ESTRELLAS PRIMERA EDICIÓN', youtubeId: 'IXpx5sNq6KM', thumbnailUrl: 'https://img.youtube.com/vi/IXpx5sNq6KM/hqdefault.jpg' },
    { title: 'NOCHE DE ESTRELLAS SEGUNDA EDICIÓN', youtubeId: 'j2o7W7gY8uw', thumbnailUrl: 'https://img.youtube.com/vi/j2o7W7gY8uw/hqdefault.jpg' },
    { title: 'NOCHE DE ESTRELLAS TERCERA EDICIÓN', youtubeId: 'amBKgqXB8co', thumbnailUrl: 'https://img.youtube.com/vi/amBKgqXB8co/hqdefault.jpg' }
  ];

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) { }

  // --- Lógica del carrusel de fotos ---
  scrollPhotos(direction: 'prev' | 'next'): void {
    const track = this.photoTrack.first.nativeElement;
    const scrollAmount = track.querySelector('.photo-gallery-item')?.clientWidth * 2; // Mueve de a 2 imágenes
    track.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  }

  onMouseDown(event: MouseEvent): void {
    const track = this.photoTrack.first.nativeElement;
    this.isDragging = true;
    this.startX = event.pageX - track.offsetLeft;
    this.scrollLeft = track.scrollLeft;
    this.renderer.addClass(track.parentElement, 'is-dragging');
  }

  onMouseLeave(track: HTMLElement): void {
    this.isDragging = false;
    this.renderer.removeClass(track.parentElement, 'is-dragging');
  }

  onMouseUp(): void {
    this.isDragging = false;
    this.renderer.removeClass(this.photoTrack.first.nativeElement.parentElement, 'is-dragging');
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const track = this.photoTrack.first.nativeElement;
    const x = event.pageX - track.offsetLeft;
    const walk = (x - this.startX) * 2;
    track.scrollLeft = this.scrollLeft - walk;
  }
  
  // --- Lógica para reproducción de videos ---
  playVideo(clickedVideo: Video): void {
    // Si la URL segura no ha sido creada, la crea. Si ya existe, no hace nada.
    if (!clickedVideo.safeUrl) {
      clickedVideo.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${clickedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`);
    }

    this.videos.forEach(video => {
      video.isPlaying = (video === clickedVideo);
    });
  }

  // --- Lógica para el modal de imagen ---
  openImageModal(imageUrl: string): void {
    // Solo abre el modal si no se estaba arrastrando
    if (!this.isDragging) {
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
