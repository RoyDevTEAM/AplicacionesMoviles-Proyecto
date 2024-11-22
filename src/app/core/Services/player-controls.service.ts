import { Injectable } from '@angular/core';
import { Camera } from 'three';

@Injectable({
  providedIn: 'root',
})
export class PlayerControlsService {
  private speed = 0.1; // Velocidad de movimiento
  private rotationSpeed = 0.02; // Velocidad de rotación

  constructor() {}

  // Mover hacia adelante
  moveForward(camera: Camera): void {
    camera.position.z -= this.speed;
  }

  // Mover hacia atrás
  moveBackward(camera: Camera): void {
    camera.position.z += this.speed;
  }

  // Mover hacia la izquierda
  moveLeft(camera: Camera): void {
    camera.position.x -= this.speed;
  }

  // Mover hacia la derecha
  moveRight(camera: Camera): void {
    camera.position.x += this.speed;
  }

  // Girar hacia la izquierda
  turnLeft(camera: Camera): void {
    camera.rotation.y += this.rotationSpeed;
  }

  // Girar hacia la derecha
  turnRight(camera: Camera): void {
    camera.rotation.y -= this.rotationSpeed;
  }
}
