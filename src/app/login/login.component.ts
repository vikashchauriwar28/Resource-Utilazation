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

  passwordValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const value: string = control.value;
    // Check if password contains at least one alphabet, one number, and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // console.log(value,'dfghjk')
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

  onSubmit() {
    console.log(this.login.value)
    console.log('login btn work')
    const userData : any = localStorage.getItem('usersData');
    const useDataJson = JSON.parse(userData)
    console.log(useDataJson,'usersData')

    let isLoggedIn = false;
    let currentUser: any;

  for (let user of useDataJson) {
    if (user.email === this.login.value.email && user.password === this.login.value.password) {
      isLoggedIn = true;
      localStorage.setItem('isloggedIn', 'true')
      currentUser = user;
      // store this user Locally
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      console.log(user);
      break;
    }
  }

  if (isLoggedIn) {
    this.authService.login(currentUser);
    this.router.navigate(['./dashboard']);
    alert('Successful login');
  } else {
    alert('Login failed');
  }
  }
}
