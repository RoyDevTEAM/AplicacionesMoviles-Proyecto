import { Component, AfterViewInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
  Color,
} from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { ModelLoaderService } from '../core/Services/model-loader.service';
import { PlayerControlsService } from '../core/Services/player-controls.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;

  constructor(
    private modelLoader: ModelLoaderService,
    private playerControls: PlayerControlsService
  ) {}

  ngAfterViewInit(): void {
    this.initThreeJS(); // Inicializa la escena y el renderizador
    this.initLaberinto(); // Carga el modelo 3D del laberinto
    this.animate(); // Inicia la animación y el bucle de renderizado
  }

  private initThreeJS(): void {
    this.scene = new Scene();
    this.scene.background = new Color(0x000000);

    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 1.6, 5);

    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: this.canvasRef.nativeElement,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.xr.enabled = true;

    document.body.appendChild(VRButton.createButton(this.renderer));

    const light = new AmbientLight(0xffffff, 1);
    this.scene.add(light);

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private async initLaberinto(): Promise<void> {
    try {
      const laberinto = await this.modelLoader.loadModel('/assets/models/low_poly_hand_-_3d_model.glb');
      laberinto.position.set(0, 0, 0);
      laberinto.scale.set(1, 1, 1);
      this.scene.add(laberinto);
    } catch (error) {
      console.error('Error al cargar el modelo del laberinto:', error);
    }
  }

  private animate(): void {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
    });
  }

  /**
   * Detecta teclas presionadas para mover la cámara
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp': // Adelante
        this.playerControls.moveForward(this.camera);
        break;
      case 'ArrowDown': // Atrás
        this.playerControls.moveBackward(this.camera);
        break;
      case 'ArrowLeft': // Rotar a la izquierda
        this.playerControls.turnLeft(this.camera);
        break;
      case 'ArrowRight': // Rotar a la derecha
        this.playerControls.turnRight(this.camera);
        break;
      case 'a': // Mover a la izquierda
        this.playerControls.moveLeft(this.camera);
        break;
      case 'd': // Mover a la derecha
        this.playerControls.moveRight(this.camera);
        break;
    }
  }
}
