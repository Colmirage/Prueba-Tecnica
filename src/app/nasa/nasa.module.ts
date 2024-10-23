import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApodComponent } from './components/apod/apod.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NeowsCardComponent } from './components/neows-card/neows-card.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule } from '@angular/forms';

import { SearchSatelliteComponent} from './components/search-satellite/search-satellite.component';
import { SatelliteComponent } from './components/satellite/satellite.component';


@NgModule({
  declarations: [
    ApodComponent,
    HomePageComponent,
    NeowsCardComponent,
    SearchBoxComponent,
    SatelliteComponent,
    SearchSatelliteComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class NasaModule { }
