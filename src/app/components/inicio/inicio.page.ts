import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  searchTerm: string = ''; // Search term for filtering models
  models = [
    {
      title: 'After the Rain VR',
      embedUrl: 'https://sketchfab.com/models/a1177381d3464f75b10cb8f462f0b9a5/embed',
    },
    
    {
      title: 'Unity Cooperation Banner',
      embedUrl: 'https://sketchfab.com/models/387e01d3eba4419da1fba371c6866407/embed',
    },
    {
      title: 'Decorative Cube Design',
      embedUrl: 'https://sketchfab.com/models/fb1b717d457540129c6bf45315aa2612/embed',
    },{
      title: 'First Person Hand - VR Ready',
      embedUrl: 'https://sketchfab.com/models/646ac6f3ae404edd988b34a989e92c5e/embed',
    },
    {
      title: 'Minecraft Castle',
      embedUrl: 'https://sketchfab.com/models/4b63724d7eab47079f905369cf8a0f98/embed',
    },
  ];

  filteredModels = this.models; // Filtered models array
  sidebarOpen: boolean = false; // To track if the sidebar is open or closed

  constructor(private sanitizer: DomSanitizer,
    private navCtrl: NavController) {}

  ngOnInit() {}

  // Method to sanitize the embed URLs
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Filter models based on the search term
  filterModels() {
    this.filteredModels = this.models.filter(model =>
      model.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
 // Método para redirigir a la ruta especificada
 navigateTo(page: string) {
  this.navCtrl.navigateRoot(`/${page}`);
  this.toggleSidebar(); // Cierra el sidebar después de navegar
}
  // Toggle sidebar visibility
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}