import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @ViewChild('mapbox', { static: true }) mapDivElement!: ElementRef;
  @ViewChild('menu', { static: true }) menu!: ElementRef;
  @ViewChild('menuHeader', { static: true }) menuHeader!: ElementRef;
  @ViewChild('radiusInput') radiusInput!: ElementRef;

  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;

  radius = 3;

  constructor(private renderer: Renderer2) {
    setTimeout(() => {
      this.initHammer();
    }, 1000)
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiYWxiZXJ0b2FsZWphbmRybzEwIiwiYSI6ImNsaTIydm9iNjEyNnkzc21iY2t2djkwcGoifQ.FftaCYWGwc83vgJcHPAfDA',
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: { lat: 43.226956, lng: 76.944064 },
      zoom: 14
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.marker =  new mapboxgl.Marker({ color: 'red' })
      .setLngLat({ lat: 43.226956, lng: 76.944064 })
      .addTo(this.map);

    // this.map.on('move', () => {
    //   this.marker.setLngLat(this.map ? this.map.getCenter() : { lat: 43.226956, lng: 76.944064 });
    // });

    this.map.on('click', () => {
      this.renderer.setStyle(this.menu.nativeElement, 'height', `${150}px`);
    });

    document.addEventListener('dblclick', function (event) {
      event.preventDefault();
    });
  }

  initHammer() {
    const hammer = new Hammer(this.menuHeader.nativeElement);

    hammer.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

    hammer.on('panmove', (event) => {
      const deltaY = event.center.y;
      let newHeight = Math.max(150, this.container.nativeElement.clientHeight - deltaY);
      newHeight = Math.min(newHeight, this.container.nativeElement.clientHeight - 100);
      this.renderer.setStyle(this.menu.nativeElement, 'height', `${newHeight}px`);
    });
  }

  handleMinusClick() {
    if (this.radius <= 1) {
      return;
    }
    this.radius--;
  }

  handlePlusClick() {
    if (this.radius >= 99) {
      return;
    }
    this.radius++;
  }

  handleRadiusChange(elementTarget: any) {
    let newRadius = +elementTarget.value;
    if (newRadius <= 1) {
      newRadius = 1;
    }
    if (newRadius > 99) {
      newRadius = 99;
    }
    this.radius = newRadius;
    this.radiusInput.nativeElement.value = newRadius;
  }
}
