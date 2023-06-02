import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/sevices/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  login : FormGroup | any;

  constructor(private authService: AuthService, private router: Router) { }

  // Custom validator function for email
  passwordValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const value: string = control.value;
    // Check if password contains at least one alphabet, one number, and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // console.log(value,'values')
    // console.log(regex.test(value) ? null : { 'passwordInvalid': true })
    return regex.test(value) ? null : { 'passwordInvalid': true };
  };
  
  // Custom validator function for email
  emailValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const value: string = control.value;
    // Check if email has a valid format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? null : { 'emailInvalid': true };
  };

  ngOnInit(): void {
    this.login = new FormGroup({
      'email': new FormControl('', [Validators.minLength(3), Validators.required, this.emailValidator]),
      'password': new FormControl('', [Validators.minLength(8), Validators.required, this.passwordValidator]),
     })
  }

  // Login button 
  onSubmit() {
    // console.log(this.login.value)
    // Register user Data
    const userData : any = localStorage.getItem('usersData');
    const useDataJson = JSON.parse(userData)
    // console.log(useDataJson,'usersData')

    // Checked user login or not
    let isLoggedIn = false;
    // Login user
    let currentUser: any;

  for (let user of useDataJson) {
    if (user.email === this.login.value.email && user.password === this.login.value.password) {
      //Set login true
      isLoggedIn = true;
      localStorage.setItem('isloggedIn', 'true')
      //Current user & login data check 
      currentUser = user;
      // store this user Locally inside currentuser
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      console.log(user);
      break;
    }
  }
  //Login successful then 
  if (isLoggedIn) {
    //Authentication check
    this.authService.login(currentUser);
    this.router.navigate(['./dashboard']);
    alert('Successful login');
  } else {
    alert('Login failed');
  }
  }
}
