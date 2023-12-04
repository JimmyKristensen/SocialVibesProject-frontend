// frontpage.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvidCallService } from '../calls/invid-call.service';
import { GetAllUsersService } from '../calls/get-all-users.service';

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
  ) {}

  login() {
    console.log('Calling Fetch');
    this.fetchData();
    console.log('Logging in');
    // Do not navigate to 'tabs/tab1' here
  }

  fetchData() {
    this.invidCallService.getInvidChats().subscribe((data) => {
      console.log('Test data given: ', data);
      this.router.navigate(['./tabs/tab1'], {
        queryParams: { invidChatsData: JSON.stringify(data) },
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
    
  }
}
