import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventmodalPage } from '../eventmodal/eventmodal.page';
import { EventCallsService } from '../calls/event/event-calls.service';


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
  constructor(
    private router: Router, 
    private modalCtrl: ModalController,
    private eventCalls: EventCallsService,
    ) {}

  ngOnInit() {
    currentPosition().then((resp) => {
      latitude = resp.coords.latitude;
      console.log(latitude)
      longitude = resp.coords.longitude;
      console.log(longitude)
      this.createMap();
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
        zoom: 13,
      },
    });
    this.addMarkers()
  }
  async addMarkers(){
    let allEventsList = await this.getAllEventList();
    const markers: Marker[] = []
    allEventsList.forEach(eventData => {
      const marker: Marker = { 
        coordinate: {
          lat: eventData.lat,
          lng: eventData.lon,
        },
        title: eventData.title,
      }
      markers.push(marker);
     })
   
    await this.newMap.addMarkers(markers)
   
    this.newMap.setOnMarkerClickListener(async (marker: any) => {
      const matchingEvent = allEventsList.find(event => event.title === marker.title).id;
      const modal = await this.modalCtrl.create({
        component: EventmodalPage,
        componentProps: {
          id: matchingEvent,
          marker
        },
        breakpoints: [0, 0.5],
        initialBreakpoint: 0.5
      });
      modal.present();
    })
   }

  toCreateEvent(){
    this.router.navigate(['/eventcreate'])
  }

  myEvents(){
    this.router.navigate(['/eventjoined'])
  }

  async getAllEventList(){
    let allEventsFromDatabase: any [] = [];
    const data = await this.eventCalls.getAllEvents().toPromise();
    let events = data['Data']['Event']
    for (let key in events){
      let eventId = events[key]['Id'];
      let latitude = events[key]['Latitude']
      let longitude = events[key]['Longitude']
      let title = events[key]['Title']
      let event = {
        id: eventId,
        lat: latitude,
        lon: longitude,
        title: title
      }
      console.log(event)
      allEventsFromDatabase.push(event)
    }
    console.log(allEventsFromDatabase)
    return allEventsFromDatabase
   }

}
const currentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position:', coordinates);
  return coordinates
};
