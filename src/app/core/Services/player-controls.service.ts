import { Injectable } from '@angular/core';
import { PerspectiveCamera, Vector3 } from 'three';

@Injectable({
  providedIn: 'root',
})
export class PlayerControlsService {
  private velocity = new Vector3(); // Velocidad actual
  private acceleration = 5; // Aceleración al presionar teclas
  private friction = 0.95; // Fricción para ralentizar el movimiento
  private maxSpeed = 10; // Velocidad máxima permitida
  private direction = new Vector3(); // Dirección actual del movimiento

  /**
   * Maneja las teclas presionadas para ajustar la dirección del movimiento.
   */
  handleKey(key: string, camera: PerspectiveCamera): void {
    switch (key) {
      case 'ArrowUp':
        this.direction.z = -1;
        break;
      case 'ArrowDown':
        this.direction.z = 1;
        break;
      case 'ArrowLeft':
        this.direction.x = -1;
        break;
      case 'ArrowRight':
        this.direction.x = 1;
        break;
      case 'a': // Movimiento lateral izquierdo
        this.direction.x = -1;
        break;
      case 'd': // Movimiento lateral derecho
        this.direction.x = 1;
        break;
      default:
        this.direction.set(0, 0, 0); // Sin movimiento
        break;
    }
  }

  /**
   * Actualiza la posición de la cámara basándose en la velocidad y el delta.
   */
  update(camera: PerspectiveCamera, delta: number): void {
    // Acelerar hacia la dirección deseada
    if (this.direction.length() > 0) {
      this.velocity.addScaledVector(this.direction, this.acceleration * delta);
    }

    // Aplicar fricción para disminuir la velocidad gradualmente
    this.velocity.multiplyScalar(this.friction);

    // Limitar la velocidad máxima
    this.velocity.clampLength(0, this.maxSpeed);

    // Mover la cámara según la velocidad actual
    camera.position.addScaledVector(this.velocity, delta);

    // Restablecer la dirección para evitar movimientos continuos sin teclas presionadas
    this.direction.set(0, 0, 0);
  }
}
