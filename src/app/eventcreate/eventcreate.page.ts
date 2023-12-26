import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap} from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { UserSelectionService } from '../savedData/user-selection.service';
import { EventCallsService } from '../calls/event/event-calls.service';


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


  constructor(
    private userSelectionService: UserSelectionService,
    private eventCalls: EventCallsService
    ) { }

  ngOnInit() {
    currentPosition().then((resp) => {
      latitude = resp.coords.latitude;
      console.log(latitude)
      longitude = resp.coords.longitude;
      console.log(longitude)
      this.createMap();
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

  postEvent(title: string, descriptions: string, adresse: string, startInfo: string ,endInfo: string){
    const userId = this.userSelectionService.getID()
    let startDate = formateDate(startInfo);
    let startTime = formateTime(startInfo)
    let endDate  = formateDate(endInfo)
    let endTime = formateTime(endInfo)
    console.log(title)
    console.log(descriptions)
    console.log(adresse)
    console.log(startDate)
    console.log(startTime)
    console.log(endDate)
    console.log(endTime)
    console.log(this.markerLatitude)
    console.log(this.markerLongitude)
    this.eventCalls.postEvent(userId, title, descriptions, adresse, startDate, startTime, endDate, endTime, this.markerLatitude, this.markerLongitude)
    .subscribe((data) => {
      console.log(data);
    })
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

