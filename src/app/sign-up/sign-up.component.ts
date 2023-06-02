import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  signUp:FormGroup | any;
  addUsers: any[] = [];
  
  // Custom validator function for email
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

  constructor(private route:Router){

  }

  ngOnInit(){
    this.signUp = new FormGroup({
      'name' : new FormControl ('',[Validators.minLength(3), Validators.required]),
      'skills' : new FormControl ('',[Validators.required]),
      'designation': new FormControl ('',[Validators.required]),
      'email': new FormControl('', [Validators.minLength(3), Validators.required, this.emailValidator]),
      'password': new FormControl('', [Validators.minLength(8), Validators.required, this.passwordValidator]),
      'location' : new FormControl ('',[Validators.required]),
      'experience': new FormControl ('',[Validators.required]),
      'userType' : new FormControl ('',[Validators.required]),
      'grade' : new FormControl ('',[Validators.required])
     }) 

    const usersData = localStorage.getItem('usersData');
    if (usersData) {
      this.addUsers = JSON.parse(usersData);
    }
  }

  onSubmit() {
    if (this.signUp.valid) {
      const position = this.signUp.value;
      console.log(this.signUp.value)

      // Add new position to positions array
      this.addUsers.push(position);

      // Save positions to local storage
      localStorage.setItem('usersData', JSON.stringify(this.addUsers));

      // Reset form
      this.signUp.reset();
      this.route.navigate(['./login'])
    }
    // this.route.navigate(['./login'])
  }

}
