import { Component, AfterViewInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
  Color,
  Clock,
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
  private clock = new Clock();

  loading = true; // Control para pantalla de carga

  constructor(
    private modelLoader: ModelLoaderService,
    private playerControls: PlayerControlsService
  ) {}

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.loadScene();
    this.animate();
  }

  private initThreeJS(): void {
    this.scene = new Scene();

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

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private async loadScene(): Promise<void> {
    try {
      const model = await this.modelLoader.loadModel('/assets/models/baba_yagas_hut.glb');
      model.position.set(0, 0, 0);
      model.scale.set(1, 1, 1);
      this.scene.add(model);
    } catch (error) {
      console.error('Error al cargar el modelo:', error);
    } finally {
      this.loading = false;
    }
  }

  private animate(): void {
    this.renderer.setAnimationLoop(() => {
      const delta = this.clock.getDelta(); // Para controlar el tiempo entre frames
      this.playerControls.update(this.camera, delta); // Actualizar controles
      this.renderer.render(this.scene, this.camera);
    });
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    this.playerControls.handleKey(event.key, this.camera);
  }
}
