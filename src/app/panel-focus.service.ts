import { Injectable } from '@angular/core';
import { GraphLayersComponent } from './graph-layers/graph-layers.component';
import { GraphEditorComponent } from './graph-editor/graph-editor.component';
import { GraphPropertiesComponent } from './graph-properties/graph-properties.component';

type myPanels =
	GraphLayersComponent | 
	GraphEditorComponent | GraphPropertiesComponent;

@Injectable({
  providedIn: 'root'
})
export class PanelFocusService {
  focusedComponent: myPanels | undefined;
  mouseOverComponent: myPanels | undefined;
  constructor() { }

  focus(component: myPanels) {
    this.focusedComponent = component;
  }

  outFocus() {
    this.focusedComponent = undefined;
  }

  mouseOver(component: myPanels) {
    this.mouseOverComponent = component;
  }

  keyUp(event: KeyboardEvent)
  {
    if (this.focusedComponent) {
      this.focusedComponent.keyEvent(event);
    }
    else if (this.mouseOverComponent) {
      this.mouseOverComponent.keyEvent(event);
    }
  }
}
