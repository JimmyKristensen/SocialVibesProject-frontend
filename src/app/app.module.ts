import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // import HttpClientModule
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'ws://127.0.0.1:5000', options: {} };

@NgModule({
 declarations: [AppComponent],
 imports: [
   BrowserModule, 
   IonicModule.forRoot(), 
   AppRoutingModule,
   FormsModule,
   HttpClientModule, // add HttpClientModule here
   SocketIoModule.forRoot(config),
 ],
 providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
 bootstrap: [AppComponent],
})
export class AppModule {}
