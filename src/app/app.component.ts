import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Spot-Utilatzation';
  isloggedIn: any;
  selectedUserType: any;
  userData: any;

  constructor(private router:Router){

  }

  ngOnInit(): void {
    const isloggedIn =localStorage.getItem('isloggedIn');
    this.isloggedIn = JSON.parse(JSON.stringify(isloggedIn))
    // console.log(typeof(this.isloggedIn))
    const usersData = localStorage.getItem('currentUser');
    if (usersData) {
      this.userData = JSON.parse(usersData);
    }
    // console.log(this.addUsers.userType)
    // this.role()
    this.selectedUserType =this.userData.userType
    
    // console.log(this.selectedUserType)
    // console.log('inside header comp')
  }
}
