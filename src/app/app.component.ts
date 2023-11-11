import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @ViewChild('menu', { static: true }) menu!: ElementRef;
  @ViewChild('menuHeader', { static: true }) menuHeader!: ElementRef;
  @ViewChild('radiusInput') radiusInput!: ElementRef;

  @ViewChild('googleMap', { static: true }) mapDivElement!: ElementRef;

  map!: google.maps.Map;
  cityCircle!: google.maps.Circle;

  radius = 1;

  constructor(private renderer: Renderer2) {
    setTimeout(() => {
      this.initHammer();
    }, 1000)
  }

  ngOnInit() {
    const loader = new Loader({
      apiKey: "AIzaSyBp3KwDMuz3N_LAAe1ZG77zl9cLCLNZ-po"
    });

    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      this.map = new Map(this.mapDivElement.nativeElement, {
        center: { lat: 43.226956, lng: 76.944064 },
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },
      });

      this.cityCircle = new google.maps.Circle({
        strokeColor: "#0cc582B3",
        strokeOpacity: 0.44,
        strokeWeight: 2,
        fillColor: "#51b8d9CC",
        fillOpacity: 0.4,
        map: this.map,
        center: { lat: 43.226956, lng: 76.944064 },
        radius: 1000,
        clickable: false
      });

      const marker = new google.maps.Marker({
        position: { lat: 43.226956, lng: 76.944064 },
        map: this.map,
        icon: {
          url: 'assets/mappin.svg',
          scaledSize: new google.maps.Size(49, 42),
        },
        draggable: false
      });

      this.map.addListener("click", () => {
        this.renderer.setStyle(this.menu.nativeElement, 'height', `${150}px`);
      });

      this.addCircle();
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
    this.addCircle();
  }

  handlePlusClick() {
    if (this.radius >= 99) {
      return;
    }
    this.radius++;
    this.addCircle();
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
    this.addCircle();
  }

  addCircle() {
    if (this.cityCircle) {
      this.cityCircle.setMap(null);
    }

    this.cityCircle = new google.maps.Circle({
      strokeColor: "#0cc582B3",
      strokeOpacity: 0.44,
      strokeWeight: 2,
      fillColor: "#51b8d9CC",
      fillOpacity: 0.4,
      map: this.map,
      center: { lat: 43.226956, lng: 76.944064 },
      radius: this.radius * 1000,
      clickable: false
    });

    const circleBounds = this.cityCircle.getBounds()!;
    this.map.fitBounds(circleBounds);
  }
}
