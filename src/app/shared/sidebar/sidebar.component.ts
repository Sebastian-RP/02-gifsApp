import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private gifServices: GifsService) { }

  get historial() {
    return this.gifServices.historial;
  }

  buscar(query: string) {
    this.gifServices.buscarGifs(query);  
  }
}
