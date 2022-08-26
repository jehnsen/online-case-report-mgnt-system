import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css']
})
export class CaseListComponent implements OnInit {

  public cases : any = [];
  constructor() { }

  ngOnInit(): void {
    this.cases = [
      {
        id: 1,
        caseNo: 'XZC123',
        caseNature: 'Robbery',
        caseTitle: 'Robbery on Mall'
      }
    ]
  }

}
