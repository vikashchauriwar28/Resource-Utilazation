import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/sevices/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  userData: any;
  selectedUserType:any;
  isloggedIn: any;
  currentUser: any;

  constructor(private authServ:AuthService,private router:Router,private authService: AuthService){

  }

  ngOnInit(): void {
    const isloggedIn =localStorage.getItem('isloggedIn');
    this.isloggedIn = JSON.parse(JSON.stringify(isloggedIn))
    console.log(typeof(this.isloggedIn))
    const usersData = localStorage.getItem('currentUser');
    if (usersData) {
      this.userData = JSON.parse(usersData);
    }
    this.selectedUserType =this.userData.userType
    
    console.log(this.selectedUserType)
    console.log('inside header comp')

    const value = 'Clear me';
    this.authService.isAuthenticated().then((authenticated) => {
      if (typeof authenticated === 'boolean' && !authenticated) {
        // Redirect to login if not authenticated
        this.authService.logOut();
        window.location.href = '/login';
      } else {
        // Get current user data
        this.currentUser = this.authService.currentUser;
        // alert(JSON.stringify(this.currentUser));
      }
    });

    // get userData Array
    // const userData: any = localStorage.getItem('usersData');
    // this.userDataArr = JSON.parse(userData)
  }

  // role(){
  //   this.userData.forEach((element: any)=>{
  //        this.selectedUserType=element.userType
  //     })
  //   }
 
    logOut(event:Event): void {
      localStorage.removeItem('isloggedIn')
      localStorage.removeItem('currentUser')
      this.router.navigate(['./login'])
      event.stopPropagation()
      this.authServ.logOut();
      
    }
    navigateOpenPosition(){
      this.router.navigate(['./open-position'])
    }
    navigateManager(){
      this.router.navigate(['./employeeFeedback'])

    }
    navigateAccount(){
      this.router.navigate(['./operation-account'])

    }
    navigateDashboard(){
      this.router.navigate(['./dashboard'])
    }
  }

