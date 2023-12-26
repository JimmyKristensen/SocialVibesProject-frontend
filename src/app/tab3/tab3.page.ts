import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';


let latitude: number;
let longitude: number;

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  @ViewChild('map') mapRef: ElementRef | any;
  newMap: GoogleMap | any;
  constructor(private router: Router) {}

  ngOnInit() {
    currentPosition().then((resp) => {
      latitude = resp.coords.latitude;
      console.log(latitude)
      longitude = resp.coords.longitude;
      console.log(longitude)
      this.createMap(); // Call createMap() here
    })
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapKey,
      forceCreate: true,
      config: {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: 15,
      },
    });
    this.addMarkers()
  }
  async addMarkers(){
    const markers: Marker[] = [
      {
        coordinate: {
          lat: 55.6885639,
          lng: 12.5079058,
        },
        title: 'Somewhere near me',
        snippet: "Yippee!"
      },
      {
        coordinate: {
          lat: 56.6885639,
          lng: 13.5079058,
        },
        title: 'Futher from me',
        snippet: "Yippee! 2"
      }
    ]

    await this.newMap.addMarkers(markers)

    this.newMap.setOnMarkerClickListener(async (marker: any) => {
      console.log(marker)
    })
  }

  toCreateEvent(){
    this.router.navigate(['/eventcreate'])
  }

}
const currentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position:', coordinates);
  return coordinates
};
