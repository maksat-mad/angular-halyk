import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('mapbox', { static: true }) mapDivElement!: ElementRef;
  map: mapboxgl.Map | undefined;
  marker: mapboxgl.Marker | undefined;

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiYWxiZXJ0b2FsZWphbmRybzEwIiwiYSI6ImNsaTIydm9iNjEyNnkzc21iY2t2djkwcGoifQ.FftaCYWGwc83vgJcHPAfDA',
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: { lat: 43.226956, lng: 76.944064 },
      zoom: 12
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.marker =  new mapboxgl.Marker({ color: 'red' })
      .setLngLat({ lat: 43.226956, lng: 76.944064 })
      .addTo(this.map);

    this.map.on('move', () => {
      this.marker?.setLngLat(this.map ? this.map.getCenter() : { lat: 43.226956, lng: 76.944064 });
    });
  }
}
