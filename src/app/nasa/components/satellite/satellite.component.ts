import { Component } from '@angular/core';
import { NasaService } from '../../services/nasa.service';

@Component({
  selector: 'app-satellite',
  templateUrl: './satellite.component.html',
  styleUrls: ['./satellite.component.css']
})
export class SatelliteComponent {

  //imageUrl: string | null = null; 

  constructor(private nasaService: NasaService) { }

  get satImg() {
    
    //console.log('get funciona');
    return this.nasaService.satImg;
  }
  
}
