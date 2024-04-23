import { AddNode } from './../nodes/add';
import { Component, ElementRef, HostListener, Injector, OnInit, ViewChild } from '@angular/core'
import { GraphEditorService } from '../graph-editor.service';

const beforeUnloadHandler = (event: { preventDefault: () => void; returnValue: boolean; }) => {
  // Recommended
  event.preventDefault(); 

  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = true;
};

@Component({
  selector: 'app-graph-editor',
  templateUrl: './graph-editor.component.html',
  styleUrl: './graph-editor.component.css',
})
export class GraphEditorComponent {
  @ViewChild('rete') container!: ElementRef<HTMLElement>;
  showMap: boolean = true;
  moduleImIn: string = 'General Editor';
  showPopup: boolean = false;
  showConfirmArrange: boolean = false;


  constructor(
    private injector: Injector,
    private graphEditorService: GraphEditorService) { 
      //window.addEventListener("beforeunload", beforeUnloadHandler); FIXME
    }


  async ngAfterViewInit() {
    await this.graphEditorService.createEditor(this.container.nativeElement,this.injector);
    await this.graphEditorService.homeZoom();
  }

  async zoomIn() {
    await this.graphEditorService.zoomIn();
  }

  async zoomOut() {
    await this.graphEditorService.zoomOut();
  }

  async homeZoom() {
    await this.graphEditorService.homeZoom();
  }

  async toggleMap() {
    this.showMap = !this.showMap;
    if (this.showMap) {
      this.container.nativeElement.classList.remove('hide-minimap');
    } else {
      this.container.nativeElement.classList.add('hide-minimap');
    }
  }

  async arrangeNodes() {
    await this.graphEditorService.arrangeNodes();
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './add-node-dialog.html',
  styleUrl: './add-node-dialog.css',
})
export class DialogComponent {
  availableNodes: Map<string, string[]> = new Map<string, string[]>();
  availableCategories : string[] = [];
  openSections : number | number[] = [];
  visible: boolean = false;
  constructor(private graphEditorService: GraphEditorService) {
    this.graphEditorService.getAvailableNodes().then((nodes)=>{
      this.availableNodes = nodes;
      for(const value of nodes.keys()){
        this.availableCategories.push(value);
      }
    })
    
  }

  activeIndexChange(index: number | number[]) {
    this.openSections= index;
  }

  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    if (event.key === ' ') {
      this.visible = true;
    }
  }

  addNode(nodeName :string) {
    this.graphEditorService.addNode(nodeName);
    this.closeAddDialog();
  }

  showAddDialog() {
    this.visible = true;
  }

  closeAddDialog() {
    this.activeIndexChange([]);
    this.visible = false;
  }

}