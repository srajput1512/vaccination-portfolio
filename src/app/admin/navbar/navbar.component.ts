import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public arraySplitUrl;
  constructor(private router: Router) { }
  
  ngOnInit(): void {
    let Url = this.router.url;
    this.arraySplitUrl = Url.split("/");
  }

  logOut() {
    localStorage.setItem('loggedInAdminData', null);
    this.router.navigate(['admin'])
  }

  navigateVaccinationDetail(){
    this.router.navigate(['user-details']);
  }

}
