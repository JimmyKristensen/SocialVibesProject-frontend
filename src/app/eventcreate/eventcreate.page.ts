import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap} from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';


let latitude: number;
let longitude: number;

@Component({
  selector: 'app-eventcreate',
  templateUrl: './eventcreate.page.html',
  styleUrls: ['./eventcreate.page.scss'],
})
export class EventcreatePage implements OnInit {
  @ViewChild('createmap') mapRef: ElementRef | any;
  newMap: GoogleMap | any;
  markerId: string | any;

  constructor() { }

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
    this.addListeners();
  }

  async addMarker(lat: any, lng: any){
    if(this.markerId) this.removeMarker()
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      }
    });
  }

  async removeMarker(id?: any) {
    await this.newMap.removeMarker(id ? id : this.markerId);
  }

  async addListeners() {
    // Handle marker click
    await this.newMap.setOnMarkerClickListener((event: { markerId: any; }) => {
      console.log('setOnMarkerClickListener', event);
      this.removeMarker(event.markerId);
    });

    await this.newMap.setOnMapClickListener((event: { latitude: any; longitude: any; }) => {
      console.log('setOnMapClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });

  }
  

}

const currentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position:', coordinates);
  return coordinates
};


