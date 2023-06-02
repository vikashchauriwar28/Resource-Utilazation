import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit{
  @Input() tableData:any;
  @Input() columnHeader:any;
  dataSource:any;
  @Output() parentMethod = new EventEmitter<any>();
  objectKeys = Object.keys;
  button:string='';

  ngOnInit(){
    console.log(this.tableData);
    console.log(this.objectKeys)
    this.dataSource = new MatTableDataSource(this.tableData);
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ngOnChanges(changes: SimpleChanges): void {
    // this.columnHeader = {'account': 'Account','project':'Project','businessUnit':'BU','requiredSkills':'Required Skills','noPosition': 'Number Of Position',};
   // alert(JSON.stringify(changes));
  //   console.log(this.tableData);
  //  }

  // @Output() shareClicked: EventEmitter<any> = new EventEmitter<any>();

  // openSharePage(element: any) {
  //   this.shareClicked.emit(element);
  // }

}

