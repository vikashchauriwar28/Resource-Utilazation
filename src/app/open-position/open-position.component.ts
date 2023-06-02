import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-open-position',
  templateUrl: './open-position.component.html',
  styleUrls: ['./open-position.component.scss']
})
export class OpenPositionComponent implements OnInit{
  positionsForm : FormGroup | any;
  positions: any[] = [];
  updateSubscription: any;

  constructor(){

  }

  //Reusable Table data
  openPositionsColumn = {'account': 'Account','project':'Project','businessUnit':'BU','requiredSkills':'Required Skills','noPosition': 'Number Of Position',};
  dataSources: any[]=[];

  ngOnInit(){
    this.positionsForm = new FormGroup({
      'account': new FormControl('',[Validators.required]),
      'project': new FormControl('',[Validators.required]),
      'businessUnit': new FormControl('',[Validators.required]),
      'requiredSkills': new FormControl('',[Validators.required]),
      'noPosition': new FormControl('',[Validators.required])
    })
   this.setTableData();
    // localStorage.clear()
  }

  // Data set for reusable mat-table
  setTableData() {
    const positionsStr = localStorage.getItem('positions');
    if (positionsStr) {
      this.positions = JSON.parse(positionsStr);
      // Store data in dataSources for reusable table
      this.dataSources = this.positions
      // console.log(this.dataSources)
    }
  }
  
  // Open Position Button method
  openPosition(){
    // console.log(this.positionsForm.valid,'asdf')
    if (this.positionsForm.valid) {
      const position = this.positionsForm.value;

      // Add new position to positions array
      this.positions.push(position);

      // Save positions to local storage
      localStorage.setItem('positions', JSON.stringify(this.positions));
    
      // Reset form
      this.positionsForm.reset();
      this.setTableData();
    }
  }

}
