import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsServices: GifsService) { }

  buscar() {
    //con el uso de viewChild nos facilita limpiar el imput o obtener sus valores
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length != 0) {
      this.gifsServices.buscarGifs(valor);
      this.txtBuscar.nativeElement.value = '';
    }

    
  }
}
