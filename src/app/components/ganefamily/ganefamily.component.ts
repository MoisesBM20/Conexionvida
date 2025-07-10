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
    { title: 'Día de la Familia 2023', youtubeId: '_rAw5_jeZX0', thumbnailUrl: 'https://img.youtube.com/vi/_rAw5_jeZX0/hqdefault.jpg' },
    { title: 'Celebración de Fin de Año', youtubeId: '6gKV1zD-Arw', thumbnailUrl: 'https://img.youtube.com/vi/6gKV1zD-Arw/hqdefault.jpg' },
    { title: 'Actividades para Niños', youtubeId: 't4gjl-uw28g', thumbnailUrl: 'assets/images/GaneFamilia/ganefamilia.png' }
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
    }, 2000);
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
  onItemClick(imageUrl: string): void {
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

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isImageModalVisible) {
      this.closeImageModal();
    }
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  pauseAutoScroll() {
    this.stopAutoScroll();
  }

  resumeAutoScroll() {
    if (!this.isImageModalVisible) {
      this.startAutoScroll();
    }
  }
}
