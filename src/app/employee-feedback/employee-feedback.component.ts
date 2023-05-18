import { Component, OnInit, inject } from '@angular/core';
// import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-feedback',
  templateUrl: './employee-feedback.component.html',
  styleUrls: ['./employee-feedback.component.scss']
})
export class EmployeeFeedbackComponent implements OnInit{
  selectedUser: any;
  userDataComment: any;
  a:any;
  // userDataCommentAdd :any;
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const resumeData = localStorage.getItem('resume');
    this.userDataComment = JSON.parse(localStorage.getItem('usersData') || '{}');
    this.selectedUser = JSON.parse(localStorage.getItem('selectedUser') || '{}');
    console.log('ty',this.selectedUser)
  }

  addComment(val :any){
 let usersData = JSON.parse(localStorage.getItem('usersData') || '[]');
  let index = usersData.findIndex((user: { name: any; }) => user.name === this.selectedUser.name);
  usersData[index].comment = val;
  localStorage.setItem('usersData', JSON.stringify(usersData));
  
  }
  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}

@Component({
  selector: 'snack-bar-annotated-component-example-snack',
  templateUrl: 'snack-bar-annotated-component-example-snack.html',
  styles: [
    `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  ],
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
}

