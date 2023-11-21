import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvidCallService } from '../calls/invid-call.service';
import { InvidService } from '../testing/invid.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: 'frontpage.page.html',
  styleUrls: ['frontpage.page.scss'],
})
export class FrontpagePage {
  constructor(private router: Router, private invidCallService: InvidCallService, private invidService: InvidService) {}

  login() {
    console.log("Calling Fetch")
    this.fetchData();
    console.log("Logging in")
    this.router.navigate(['./tabs']);
  }
fetchData() {
  this.invidService.getInvidChats().subscribe(data => {
    console.log('Test data given: ', data);
    this.router.navigate(['./tabs/tab1'], { queryParams: { invidChatsData: JSON.stringify(data) } });
  });
}

  
}

