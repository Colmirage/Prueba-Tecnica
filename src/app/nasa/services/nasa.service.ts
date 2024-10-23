import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Neo } from '../interfaces/nasa.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private apodUrl = 'https://api.nasa.gov/planetary/apod';
  private neowsUrl = 'https://api.nasa.gov/neo/rest/v1/feed';
  private satelliteUrl = 'https://api.nasa.gov/planetary/earth/imagery';

  private apiKey = environment.apiKey;

  private _dates: any[] = [];
  private _apodObj: any

  private _satImg: any

  constructor(private http: HttpClient) { }

  get dates() {
    return [...this._dates];
  }

  get apod() {
    return this._apodObj;
  }

  get satImg() {
    console.log(this.satImg)
    return this._satImg;
  }

  getApod() {
    /**
     * Paso 1
     * Almacene en una variable un número aleatorio entre 1 y 7
     */
    const randomNum: number = Math.floor(Math.random() * 7) + 1;
    //console.log(randomNum)

    /**
     * Paso 2
     * Fecha aleatoria entre últimos 7 días
     * Obtenga y almacene en una variable la fecha actual
     * A los días de la fecha actual le debe restar el número obtenido en el Paso 1 para obtener una fecha aleatoria de los últimos 7 días
     */
    const date: Date = new Date();
    //console.log(date)
    date.setDate(date.getDate() - randomNum)
    //console.log(date)

    /**
     * Paso 3
     * petición APOD endpoint
     * consulte el endpoint https://api.nasa.gov/planetary/apod enviando los parámetros:
     * date = fecha obtenida en el Paso 2 en formato YYYY-MM-DD
     * api_key = su API KEY generado en el sitio web https://api.nasa.gov/
     * Debe asignar el valor de la respuesta del endpoint a la variable global _apod que ya se encuentra declarada, ejemplo: this._apodObj = respuesta;
     */
    const apiDate = date.toISOString().split('T')[0];
    //console.log(apiDate)

    let params = new HttpParams()
    .set('date', apiDate)
    .set('api_key', this.apiKey);
    
    this.http.get(this.apodUrl, { params: params }).subscribe(
      (response) => {
        //console.log('Respuesta:', response);
        this._apodObj = response;
      },
      (error) => {
        //console.log('Error en la peticion',error);
      }
    );
  }

  /**
   * 
   * @param date Fecha seleccionada en el input date
   */
  buscarNeo(date: string) {
    //console.log('inicia buscar neo')
    console.log(date)
    /**
     * Paso 1
     * petición NEOWS endpoint
     * consulte el endpoint https://api.nasa.gov/neo/rest/v1/feed enviando los parámetros:
     * api_key = su API KEY generado en el sitio web https://api.nasa.gov/
     * start_date = parámetro date recibido en la función en formato YYYY-MM-DD.
     * end_date = parámetro date recibido en la función en formato YYYY-MM-DD.
     * Nota: para start_date y end_date se utiliza el mismo valor el cual llega como parámetro de la función.
     * Debe asignar el valor de la respuesta del endpoint a la variable global _dates, ejemplo: this._dates = respuesta.near_earth_objects[date], siendo [date] el parámetro que recibe la función;
     */

    let params2 = new HttpParams()
    .set('start_date', date)
    .set('end_date', date)
    .set('api_key', this.apiKey);
    //console.log(params2.toString())

    this.http.get<Neo>(this.neowsUrl, { params: params2 }).subscribe(
      (response2) => {
        //console.log('Respuesta neows:', response2);
        this._dates = response2.near_earth_objects[date];
      },
      (error) => {
        console.log('Error en la peticion neows',error);
      }
    );
  }

  buscarSatellite(lat: number, lon: number) {
    console.log(lat,lon)

    let params3 = new HttpParams()
      .set('lon', lon)
      .set('lat', lat)
      .set('date', '2018-01-01')
      .set('dim', 0.15)
      .set('api_key', this.apiKey);

      this.http.get(this.satelliteUrl, {responseType: 'blob', params: params3 }).subscribe(
        (response3: Blob) => {
          //console.log('respuesta Satellite', response3);
          const link = URL.createObjectURL(response3);
          //console.log('url generada:',link)
          this._satImg = link;
          console.log(this._satImg)
        },
        (error) => {
          console.log('Error en la peticion Satellite',error)
        }
      );
  }
}