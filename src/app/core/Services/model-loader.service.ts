import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from 'three';

@Injectable({
  providedIn: 'root',
})
export class ModelLoaderService {
  private loader = new GLTFLoader();

  loadModel(path: string): Promise<Object3D> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (gltf) => resolve(gltf.scene),
        undefined,
        (error) => reject(error)
      );
    });
  }
}
