import { Component, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  menuOpen = false;
  searchQuery: string = '';
  filteredItems: { text: string; url: string; isExternal?: boolean }[] = [];
  private searchableContent: { text: string; url: string; isExternal?: boolean }[] = [];

  constructor(private elementRef: ElementRef, private router: Router) {}

  ngAfterViewInit() {
    this.collectSearchableContent();
  }

  // HostListener para detectar clics en el documento
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Verifica si el clic ocurrió fuera del elemento 'search-section'
    // 'elementRef.nativeElement' se refiere al elemento raíz del componente <app-navbar>
    // 'this.elementRef.nativeElement.querySelector('.search-section')' busca el div de la barra de búsqueda y resultados
    const searchSection = this.elementRef.nativeElement.querySelector('.search-section');

    // Si la sección de búsqueda existe y el clic NO está contenido dentro de ella,
    // y si hay resultados mostrándose O el mensaje de "no resultados" está visible, entonces ocúltalos.
    if (searchSection && !searchSection.contains(event.target as Node)) {
      if (this.filteredItems.length > 0) {
        this.filteredItems = []; // Esto oculta los resultados de búsqueda si los hay
      } else if (this.searchQuery) { // Si no hay resultados pero hay una búsqueda ingresada (y por ende, el mensaje de no resultados)
        this.searchQuery = ''; // Vacía la consulta para ocultar el mensaje de "no resultados"
      }
    }
  }

  private collectSearchableContent() {
    const navItems = this.elementRef.nativeElement.querySelectorAll('nav > ul > li > a:not(.dropdown), .dropdown-menu .item-title');

    this.searchableContent = [];
    const uniqueTexts = new Set<string>();

    navItems.forEach((item: HTMLElement) => {
      let text: string | undefined;
      let url: string | undefined;
      let isExternal: boolean = false;

      if (item.classList.contains('item-title')) {
        text = item.textContent?.trim();
        const parentLink = item.closest('a');
        url = parentLink?.getAttribute('href') ?? parentLink?.getAttribute('routerLink') ?? undefined;
        isExternal = !!parentLink?.getAttribute('href');
      } else {
        text = item.textContent?.trim();
        url = item.getAttribute('href') ?? item.getAttribute('routerLink') ?? undefined;
        isExternal = !!item.getAttribute('href');
      }

      if (text && url && !uniqueTexts.has(text)) {
        uniqueTexts.add(text);
        this.searchableContent.push({ text, url, isExternal });
      }
    });

const staticItems = [
  { text: 'EMI', url: '/agreement', agreementName: 'EMI' },
  { text: 'CONFANDI', url: '/agreement', agreementName: 'Comfandi' },
  { text: 'CECEP', url: '/agreement', agreementName: 'CECEP' },
  { text: 'UNIVERSIDAD', url: '/agreement', agreementName: 'Javeriana' }, 
  { text: 'APOYO', url: '/agreement', agreementName: 'FNA' }, 

  { text: 'FISICO', url: '/bphysical'}, 
  { text: 'EMOCIONAL', url: '/bmental'}, 
  { text: 'EDUCATIVO', url: '/beducational'}, 
  { text: 'FINANCIERO', url: '/bfinancial' }, 
  
  //----- PENDIENTE POR REVISAsdsdsR 
  { text: 'CUMPLEAÑOS', url: '/bmental', agreementName: 'Cumpleaños' }, 
  { text: 'QUINQUENIOS', url: '/bmental', agreementName: 'Quinquenios' },
  { text: 'VACACIONES', url: '/bmental', agreementName: 'Aviatur' }, 
  { text: 'MUDANZA', url: '/bmental', agreementName: 'Mudanza' }, 
  { text: 'SUCREDITO', url: '/agreement', agreementName: 'SuCrédito' },
  { text: 'FNA', url: '/agreement', agreementName: 'FNA' },
  { text: 'FONDO NACIONAL DEL AHORRO', url: '/agreement', agreementName: 'FNA' },

  // Palabras clave que no son convenios, se asocian a otras rutas
  { text: 'EQUIPO', url: '/team' },
  { text: 'ATRACCIÓN', url: '/attraction' },
  { text: 'BIENESTAR', url: '/agreement' },
  { text: 'TALENTO', url: '/attraction' },
  { text: 'CRECIMIENTO', url: '/beducational' }, // Asumiendo una nueva ruta
  { text: 'PROMOCIÓN', url: '/attraction' }, // Asumiendo una nueva ruta
  { text: 'NOCHE', url: '/stars' }, // Redirigido a Noche de Estrellas
  { text: 'ESTRELLAS', url: '/stars' },
  { text: 'FAMILIAS', url: '/ganefamily' },
  { text: 'PENSIÓN', url: '/pensioner' }, // Redirigido a Pensionados
  { text: 'FORMACIÓN', url: '/beducational' },

];

    staticItems.forEach(item => {
      if (!uniqueTexts.has(item.text)) {
        uniqueTexts.add(item.text);
        this.searchableContent.push(item);
      }
    });

    console.log('Searchable Content:', this.searchableContent);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase().trim();
    if (query) {
      this.filteredItems = this.searchableContent
        .filter(item => item.text.toLowerCase().includes(query) && item.url)
        .sort((a, b) => a.text.localeCompare(b.text));
    } else {
      this.filteredItems = [];
    }
    console.log('Filtered Items:', this.filteredItems);
  }

  clearSearch() {
    this.searchQuery = '';
    this.filteredItems = [];
  }
navigateTo(item: { text: string; url: string; isExternal?: boolean; agreementName?: string }) {
    if (item.url) {
        if (item.isExternal) {
            window.location.href = item.url;
        } else {
            // Verifica si el ítem es un convenio y navega con el queryParam
            if (item.agreementName) {
                this.router.navigate([item.url], { queryParams: { agreementName: item.agreementName } });
            } else {
                this.router.navigateByUrl(item.url);
            }
        }
        this.filteredItems = []; // Oculta los resultados
        this.searchQuery = ''; // Limpia la búsqueda
    }
}
}
