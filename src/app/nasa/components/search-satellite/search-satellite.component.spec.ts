import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSatelliteComponent } from './search-satellite.component';

describe('SearchSatelliteComponent', () => {
  let component: SearchSatelliteComponent;
  let fixture: ComponentFixture<SearchSatelliteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSatelliteComponent]
    });
    fixture = TestBed.createComponent(SearchSatelliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
