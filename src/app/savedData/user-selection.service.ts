import { ProfileService } from '../calls/profile.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UserSelectionService {
  private selectedUserId: string = '';
  userId: any;
  userName: any;
  userInfo: any;
  timestamp: any;

  constructor(
    private profileService: ProfileService
    ) {}

  getSelectedUserId(): string {
    return this.selectedUserId;
  }

  
  setSelectedUserId(Id: string): void {
    console.log("LOGGGING IN AS: " + Id);
    this.selectedUserId = Id;
  
    this.profileService.setUser(this.selectedUserId).subscribe({
      next: (userData) => {
        if (userData && userData.data) {
          this.userInfo = userData.data;
          this.setID(String(this.userInfo.id));
          this.setName(String(this.userInfo.Name));
          this.setTimestamp(this.userInfo.TimeStamp);
        } else {
          console.error('User data not available.');
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }
 
  setID(userId: string){
    this.userId = userId
    console.log("SET NAME TO: "+userId)
  }
  setName(userName: string){
    this.userName = userName
    console.log("SET NAME TO: "+userName)
  }
  setTimestamp(userTimestamp: string){
    this.timestamp = userTimestamp
    console.log("SET TIMESTAMPT TO: "+userTimestamp)
  }
  getID(){
    return this.userId
  }
  getName(){
    return this.userName
  }
  getTimestamp(){
    return this.timestamp
  }
  
  
}
