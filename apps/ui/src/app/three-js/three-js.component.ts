import { Component } from '@angular/core';
import { NgtCanvas, NgtCanvasContent, NgtCanvasImpl } from 'angular-three/dom';

import { SceneGraph } from './scene-graph';

@Component({
  selector: 'app-three-js',
  imports: [
    NgtCanvas,
    NgtCanvasImpl,
    SceneGraph,
    NgtCanvasContent,
  ],
  template: `
    <ngt-canvas shadows [camera]="{ position: [5, 5, 5] }" [lookAt]="[0, 1, 0]">
      <app-scene-graph *canvasContent />
    </ngt-canvas>
  `,
  styles: `
    :host {
      display: block;
      height: 100dvh;
    }
  `,
})
export class ThreeJsComponent {}
