import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';

// Import Three.js (make sure Three.js is installed in your project)
import * as THREE from 'three';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, AfterViewInit {
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
    },
    {
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

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controller: any;

  constructor(private sanitizer: DomSanitizer, private navCtrl: NavController) {}

  ngOnInit() {
    this.initializeWebXR();
  }

  ngAfterViewInit() {
    // Initialize the Three.js scene after the view is loaded
    this.initializeThreeJS();
  }

  // Initialize Three.js scene
  initializeThreeJS() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    this.camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  // Initialize WebXR for immersive VR
  initializeWebXR() {
    if (navigator.xr) {
      navigator.xr.requestSession('immersive-vr').then((session) => {
        // Handle the WebXR session here
        session.addEventListener('inputsourceschange', (event: any) => {
          // The event object now contains 'added' and 'removed' input sources
          const addedSources = event.added; // New input sources
          const removedSources = event.removed; // Removed input sources

          // Handle added input sources (controllers, hands, etc.)
          addedSources.forEach((inputSource: any) => {
            if (inputSource.gamepad) {
              // Handle gamepad input (usually controllers)
              const gamepad = inputSource.gamepad;
              console.log('Gamepad connected', gamepad);
              // You can track button presses or joystick movements here
            }
            if (inputSource.hand) {
              // Handle hand input (optional, if you use hands in VR)
              console.log('Hand input detected', inputSource.hand);
            }
          });

          // Handle removed input sources
          removedSources.forEach((inputSource: any) => {
            console.log('Input source removed', inputSource);
            // Handle controller or hand removal here
          });
        });

        // Request a reference space for the XR session
        session.requestReferenceSpace('local').then((refSpace) => {
          session.requestAnimationFrame((time, frame) => {
            this.renderer.render(this.scene, this.camera);
          });
        });

        // Add the WebXR session to your session and handle it
        session.addEventListener('end', () => {
          console.log('XR session ended');
        });
      });
    }
  }

  // Method to navigate to the specified page
  navigateTo(page: string) {
    this.navCtrl.navigateRoot(`/${page}`);
    this.toggleSidebar(); // Close the sidebar after navigation
  }

  // Toggle sidebar visibility
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Method to sanitize URLs and allow them to load
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Filter models based on the search term
  filterModels() {
    this.filteredModels = this.models.filter((model) =>
      model.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
