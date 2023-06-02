import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
  searchReq: FormGroup | any;
  searchArr: any[] = [];
  userData: any[] = [];
  getOpenPosition: any[] = [];
  userDataArr: any[] = [];
  selectedAccount: any;
  selectedProject: any;
  skillArr: any=[];
  matchedEmployee: any[] = [];
  numberPosition : number[]=[]
  getProject: any = [];
  match: any[] = [];

  // columnHeader = {'name': 'Name','skills':'Skills','designation':'Designation','comment':'Prevoius Project comment','experience': 'Experience in year','share': 'Share Resume', 'action': 'Action'};
  // dataSources: any[]=[];
  // public dataSource = new MatTableDataSource <SampleTable>(); 

  ngOnInit(): void {
    this.searchReq = new FormGroup({
      'reqProject': new FormControl('',[Validators.required]),
      'regAccount': new FormControl('',[Validators.required])
    })

    const positionStrGet: any = localStorage.getItem('positions')
    this.getOpenPosition = JSON.parse(positionStrGet);

    // User Data
    const userData: any = localStorage.getItem('usersData')
    this.userDataArr = JSON.parse(userData)
    const searchData: any = localStorage.getItem('serachVal')
    const searchDataParse = JSON.parse(searchData)  
  }

  constructor(private route: Router) {

  }

  // On Account value Change 
  handleAccountChange(e: any) {
    // debugger
    this.selectedAccount = e.value;
    // set project empty
    this.getProject = [];
    // Loop on Open-Position for account match from open position array
    this.getOpenPosition.forEach((element) => {
      if (element.account === this.selectedAccount) {
        this.getProject.push(element.project[0]);
       }
      //  console.log(this.getProject);
    })     
  }
  
  // On Project select 
  handleProjectChange(ev: any) {
    // debugger
    this.numberPosition = [];
    //Get value from input field
    this.selectedProject = ev.value;
     // Loop on Open-Position for get number of position
    this.getOpenPosition.forEach((eve)=>{
      if (eve.account === this.selectedAccount) {
        eve.project.forEach((pro: any) => {
          if (pro === this.selectedProject) {
            // store number of position inside numberPosition variable
            this.numberPosition.push(eve.noPosition)
          }
        })
      }
    })
  }

  //on Search button 
  onSearch() {
    this.getOpenPosition.forEach((element) => {
      if (element.account === this.selectedAccount) {
        element.project.forEach((pro: any) => {
          if (pro === this.selectedProject) {
            this.skillArr = element.requiredSkills, 'match skill';
            this.matchSkills();
          //  console.log( this.dataSources,'data operation')
          }
        })
      }
    })
  }

  matchSkills() {
    this.matchedEmployee=[];  
    this.userDataArr.forEach((element) => {
      element.skills.forEach((ill: any) => {
        this.skillArr.forEach((matchSkill: any) => {
          if(ill == matchSkill) {
            this.matchedEmployee.push(element);
             const expected = new Set();
              this.match = this.matchedEmployee.filter(item => !expected.has(JSON.stringify(item)) ? expected.add(JSON.stringify(item)) : false);
            // this.dataSources=this.matchedEmployee
          }
        })
      })
    })
  }
  openSHarePage(user:any) {
    this.route.navigate(['./employeeFeedback']);
    localStorage.setItem('selectedUser', JSON.stringify(user));
  }
}
