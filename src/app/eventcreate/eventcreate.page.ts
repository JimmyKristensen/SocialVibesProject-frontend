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

  title: string | any;
  descriptions: string | any;
  adresse: string | any;
  starttime: string | any;
  endtime: string | any;
  googleMap: string | any;
  markerLatitude: string | any;
  markerLongitude: string | any;

  currentDate: any


  constructor() { }

  ngOnInit() {
    currentPosition().then((resp) => {
      latitude = resp.coords.latitude;
      console.log(latitude)
      longitude = resp.coords.longitude;
      console.log(longitude)
      this.createMap(); // Call createMap() here
    })
    this.currentDate = new Date().toISOString();
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
      this.markerLatitude = event.latitude;
      this.markerLongitude = event.longitude;
      this.addMarker(event.latitude, event.longitude);
    });

  }

  postEvent(title: string, descriptions: string, adresse: string, starttime: string ,endtime: string){
    
    console.log(title)
    console.log(descriptions)
    console.log(adresse)
    console.log(formateDate(starttime))
    console.log(formateTime(starttime))
    console.log(endtime)
    console.log(this.markerLatitude)
    console.log(this.markerLongitude)
  }
  

}

const currentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position:', coordinates);
  return coordinates
};


function formateDate(dateToConveryt: string) {
  let date = new Date(dateToConveryt);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let formattedDate = `${day}-${month}-${year}`;
  return formattedDate
}

function formateTime(dateToConveryt: string){
  let date = new Date(dateToConveryt);
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let formattedTime = `${hours}:${minutes}`;
  return formattedTime
}

