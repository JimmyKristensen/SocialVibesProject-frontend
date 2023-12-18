// frontpage.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvidCallService } from '../calls/invidChat/invid-call.service';
import { GetAllUsersService } from '../calls/getUsers/get-all-users.service';
import { UserSelectionService } from '../savedData/user-selection.service'

interface UserData {
  Name: string;
  TimeStamp: string;
}

@Component({
  selector: 'app-frontpage',
  templateUrl: 'frontpage.page.html',
  styleUrls: ['frontpage.page.scss'],
})
export class FrontpagePage {
  allUsersData: { [key: string]: UserData } = {}; // Type for user data
  selectedUserId: string = '';

  constructor(
    private router: Router,
    private invidCallService: InvidCallService,
    private getAllUsersService: GetAllUsersService,
    private userSelectionService: UserSelectionService, // Injected service to save the user id
  ) {}

  login() {
    // Check if a user is selected
    if (!this.selectedUserId) {
      console.error('No user selected!');
      return;
    }
    console.log('Logging in with user ID:', this.selectedUserId);

    // Save the selected user ID to the service
    this.userSelectionService.setSelectedUserId(this.selectedUserId);

    this.fetchData(this.selectedUserId);
  }

  fetchData(userID: string) {
    this.invidCallService.getInvidChats(userID).subscribe((data) => {
      console.log('Test data given: ', data);
      this.router.navigate(['./tabs/tab1'], {
        queryParams: { userID: userID },
      });
    });
  }

  ngOnInit() {
    this.getAllUsersService.getAllUsers().subscribe((data) => {
      console.log('All users: ', data);
      this.allUsersData = data.profiles;
    });
  }

  selectUser(userId: string) {
    console.log('Selected user ID:', userId);
    this.selectedUserId = userId;
  }
}
