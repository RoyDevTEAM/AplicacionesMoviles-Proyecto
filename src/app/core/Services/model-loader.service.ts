import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({ providedIn: 'root' })
export class ModelLoaderService {
  private loader = new GLTFLoader();

  loadModel(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (gltf) => resolve(gltf.scene), // Devuelve la escena del modelo
        undefined,
        (error) => reject(error) // Manejo de errores
      );
    });
  }
}
