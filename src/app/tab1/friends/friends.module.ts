// friends.module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FriendsComponent } from './friends.component';

@NgModule({
  declarations: [FriendsComponent],
  imports: [SharedModule],
})
export class FriendsModule {} 
