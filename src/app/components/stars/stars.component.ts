import { Component, ViewChildren, QueryList, ElementRef, Renderer2, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('photoTrack') photoTrack!: QueryList<ElementRef>;

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

  private autoScrollInterval: any = null;

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.startAutoScroll();
  }

  startAutoScroll() {
    this.stopAutoScroll();
    this.autoScrollInterval = setInterval(() => {
      if (!this.isImageModalVisible && this.photoTrack && this.photoTrack.first) {
        this.scrollPhotos('next');
      }
    }, 2500);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  scrollPhotos(direction: 'prev' | 'next'): void {
    const track = this.photoTrack.first.nativeElement;
    const item = track.querySelector('.photo-gallery-item');
    if (!item) return;
    const scrollAmount = item.clientWidth * 2;

    if (direction === 'next') {
      // Si estamos cerca del final, vuelve al inicio
      if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - scrollAmount) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else {
      // Si estamos al inicio, ve al final
      if (track.scrollLeft <= 0) {
        track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
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

  // ---  Lógica para el modal de imagen ---
  openImageModal(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
    this.isImageModalVisible = true;
    this.stopAutoScroll();
  }

  closeImageModal(): void {
    this.isImageModalVisible = false;
    setTimeout(() => { 
      this.selectedImageUrl = null; 
      this.startAutoScroll();
    }, 300);
  }

  pauseAutoScroll() {
    this.stopAutoScroll();
  }

  resumeAutoScroll() {
    if (!this.isImageModalVisible) {
      this.startAutoScroll();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isImageModalVisible) {
      this.closeImageModal();
    }
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }
}
