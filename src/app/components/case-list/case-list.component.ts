import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css']
})
export class CaseListComponent implements OnInit {
  p: number = 1;
  public cases : any = [];
  caseTitle: any;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getCases()
    console.log(this.cases.length)
  }

  getCases(): void {
    this.cases = [
      {
        id: 1,
        caseNo: 'XZC123',
        caseNature: 'Robbery',
        caseTitle: 'Robbery on Mall'
      },
      {
        id: 2,
        caseNo: 'XZC098',
        caseNature: 'Harassment',
        caseTitle: 'Sexual Harrashment'
      },
      {
        id: 9,
        caseNo: 'XZC345',
        caseNature: 'Cyber crime',
        caseTitle: 'Cyber Bullying'
      },
      {
        id: 3,
        caseNo: 'XZC123',
        caseNature: 'Robbery',
        caseTitle: 'Robbery on Mall'
      },
      {
        id: 4,
        caseNo: 'XZC098',
        caseNature: 'Harassment',
        caseTitle: 'Sexual Harrashment'
      },
      {
        id: 5,
        caseNo: 'XZC345',
        caseNature: 'Cyber crime',
        caseTitle: 'Cyber Bullying'
      },
      {
        id: 6,
        caseNo: 'XZC123',
        caseNature: 'Robbery',
        caseTitle: 'Robbery on Mall'
      },
      {
        id: 7,
        caseNo: 'XZC098',
        caseNature: 'Harassment',
        caseTitle: 'Sexual Harrashment'
      },
      {
        id: 8,
        caseNo: 'XZC345',
        caseNature: 'Cyber crime',
        caseTitle: 'Cyber Bullying'
      }
    ]
  }

  Search(){
    if(this.caseTitle == ""){
      this.getCases()
    } else {
      this.cases = this.cases.filter((c: any) => {
        return c.caseTitle.toLocaleLowerCase().match(this.caseTitle.toLocaleLowerCase());
      });
    }
  }

  
}
