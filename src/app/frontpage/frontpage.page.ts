import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvidCallService } from '../calls/invid-call.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: 'frontpage.page.html',
  styleUrls: ['frontpage.page.scss'],
})
export class FrontpagePage {
  constructor(private router: Router, private invidCallService: InvidCallService) {}

  login() {
    this.fetchData
    this.router.navigate(['./tabs']);
  }
  fetchData() {
    this.invidCallService.getInvidChats().subscribe(data => {
      console.log("This is the test data: "+data)

     
    });
  }
}

