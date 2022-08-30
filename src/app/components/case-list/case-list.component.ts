import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css']
})
export class CaseListComponent implements OnInit {
  p: number = 1;
  public cases : any = [];
  caseTitle: any;
  constructor(private caseService: CaseService) { }

  ngOnInit(): void {
    this.getCases();
  }

  getCases(): void {
    this.caseService.getCases().subscribe((response: any) => {
      this.cases = response.data
    })
  }

  Search(){
    if(this.caseTitle == ""){
      this.getCases()
    } else {
      this.cases = this.cases.filter((c: any) => {
        return c.incident_title.toLocaleLowerCase().match(this.caseTitle.toLocaleLowerCase());
      });
    }
  }

  
}
