import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frontpage',
  templateUrl: 'frontpage.page.html',
  styleUrls: ['frontpage.page.scss'],
})
export class FrontpagePage {
  constructor(private router: Router) {}

  login() {
 
    this.router.navigate(['./tabs']);
  }
}

