import { Component } from '@angular/core';
import { NasaService } from '../../services/nasa.service';

@Component({
  selector: 'app-search-satellite',
  templateUrl: './search-satellite.component.html',
  styleUrls: ['./search-satellite.component.css']
})
export class SearchSatelliteComponent {
  latInput: number;
  lonInput: number;

  constructor (private nasaService: NasaService) {
    this.latInput = 0;
    this.lonInput = 0;
  
  }

  printSatellite() {
    this.nasaService.buscarSatellite(this.latInput, this.lonInput)
  }


}
