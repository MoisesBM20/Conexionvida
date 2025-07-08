import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Interfaz para las publicaciones del mes
export interface TimelinePost {
  date: string;
  imageUrl: string;
  altText: string;
  description: string;
}
export interface BenefitButton {
  icon: string;
  text: string;
  action: () => void; // Define una acción para cada botón
}
export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-bphysical',
  templateUrl: './bphysical.component.html',
  styleUrls: ['./bphysical.component.scss']
})
export class BPhysicalComponent {

  isInfoModalVisible = false;
  isModalClosing = false; 

  private monthOrder = [
    'MES DE ENERO', 'MES DE FEBRERO', 'MES DE MARZO', 'MES DE ABRIL',
    'MES DE MAYO', 'MES DE JUNIO', 'MES DE JULIO', 'MES DE AGOSTO',
    'MES DE SEPTIEMBRE', 'MES DE OCTUBRE', 'MES DE NOVIEMBRE', 'MES DE DICIEMBRE'
  ];

  get currentMonth(): string {
    return this.monthOrder[new Date().getMonth()];
  }
  
  get groupedPosts() {
    const monthOrder = [
      'MES DE ENERO', 'MES DE FEBRERO', 'MES DE MARZO', 'MES DE ABRIL',
      'MES DE MAYO', 'MES DE JUNIO', 'MES DE JULIO', 'MES DE AGOSTO',
      'MES DE SEPTIEMBRE', 'MES DE OCTUBRE', 'MES DE NOVIEMBRE', 'MES DE DICIEMBRE'
    ];
    const groups = this.posts.reduce((acc, post) => {
      (acc[post.date] = acc[post.date] || []).push(post);
      return acc;
    }, {} as { [key: string]: TimelinePost[] });
    
    return Object.keys(groups)
      .map(month => ({ month, posts: groups[month] }))
      .sort((a, b) => {
        if (a.month === this.currentMonth) return -1;
        if (b.month === this.currentMonth) return 1;
        return monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month);
      });
  }

    posts: TimelinePost[] = [
      {
        date: 'MES DE JUNIO',
        imageUrl: 'assets/images/ring/Bphysical/correr.jpg', 
        altText: '',
        description: '¡CORRE Y GANE!'
      },
      {
        date: 'MES DE JULIO',
        imageUrl: '', 
        altText: '',
        description: 'Proximamente actividades!'
      },
    ];

    benefitButtons: BenefitButton[] = [
      { icon: 'info', text: 'Detalle por Incapacidad', action: () => this.openInfoModal() },
      { icon: 'add_circle', text: 'Más Convenios', action: () => this.navigateTo('/agreement') }
  ];
  constructor(private router: Router) { }

  // --- Métodos para el Modal ---
  openInfoModal(): void {
    this.isInfoModalVisible = true;
    this.isModalClosing = false; 
  }

  closeInfoModal(): void {
    this.isModalClosing = true; 
    setTimeout(() => {
      this.isInfoModalVisible = false;
      this.isModalClosing = false; 
    }, 300); 
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  
  benefits: Benefit[] = [];



}

