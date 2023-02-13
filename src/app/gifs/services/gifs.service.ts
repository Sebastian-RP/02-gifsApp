import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {
    // this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    if (localStorage.getItem('historial')) { this._historial = JSON.parse(localStorage.getItem('historial')!) }

    if (localStorage.getItem('historialGifs')) { this.resultados = JSON.parse(localStorage.getItem('historialGifs')!) }
  }

  private apiKey: string = 'A1jRl2MVzniwIHBAaar6CPzxrg9W1JbT';
  private _historial: string[] = [];
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  // TODO: remplazar los any
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string = '') {
    
    query = query.trim().toLocaleLowerCase();

    if (query.trim().length != 0 && !this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.getEspecificGifs(query)
  }

  getEspecificGifs(query: string) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', query)
    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params: params})
      .subscribe((res) => {
        this.resultados = res.data;
        localStorage.setItem('historialGifs', JSON.stringify(this.resultados));
    });
  }

}