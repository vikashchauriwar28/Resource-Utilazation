import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/sevices/auth-service/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  currentUser: any;
  uploadResume: FormGroup | any;
  // file: File | null = null;
  userDataArr: any;
  currentUserInfo: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.uploadResume = new FormGroup({
      'upload': new FormControl('')
    })

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
    const userData: any = localStorage.getItem('usersData');
    this.userDataArr = JSON.parse(userData)

  }

  // onFileSelected(event: any) {
  //   this.file = event.target.files[0];
  // }
  // onUpload() {
  //   if (!this.file) {
  //     return;
  //   }

  //   if (this.file.type !== 'application/pdf') {
  //     console.log('Only PDF files are allowed');
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.file);
  //   reader.onload = () => {
  //     localStorage.setItem('resume', reader.result as string);
  //     console.log('Resume uploaded successfully');
  //   };    
  // }
}
