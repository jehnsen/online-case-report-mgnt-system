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
    this.caseService.getCases().subscribe((response: any) => {
      this.cases = response.data
    })
    console.log(this.cases)
  }

  getCases(): void {
    this.cases = [
      {
        id: 1,
        caseNo: 'SOCO RFU COR - E 001 - 2022',
        caseNature: 'Robbery',
        caseTitle: 'Robbery on Mall',
        requestingParty: 'Golden State Warriors'
      },
      {
        id: 2,
        caseNo: 'SOCO RFU COR - E 002 - 2022',
        caseNature: 'Harassment',
        caseTitle: 'Sexual Harrashment',
        requestingParty: 'Los Angeles Lakers'
      },
      {
        id: 9,
        caseNo: 'SOCO RFU COR - E 003 - 2022',
        caseNature: 'Cyber crime',
        caseTitle: 'Cyber Bullying',
        requestingParty: 'San Antonio Spurs'
      },
      {
        id: 3,
        caseNo: 'SOCO RFU COR - E 004 - 2022',
        caseNature: 'Blackmailing',
        caseTitle: 'Blackmailing of foreigner',
        requestingParty: 'Dallas Mavericks'
      },
      {
        id: 4,
        caseNo: 'SOCO RFU COR - E 005 - 2022',
        caseNature: 'Rape',
        caseTitle: 'Attempted rape his ex-girlfriend',
        requestingParty: 'Chicago Bulls'
      },
      {
        id: 5,
        caseNo: 'SOCO RFU COR - E 006 - 2022',
        caseNature: 'Cyber crime',
        caseTitle: 'Hacking on government websites',
        requestingParty: 'Houston Rockets'
      },
      {
        id: 6,
        caseNo: 'SOCO RFU COR - E 007 - 2022',
        caseNature: 'Murder',
        caseTitle: 'Attempted murder',
        requestingParty: 'Toronto Raptors'
      },
      {
        id: 7,
        caseNo: 'SOCO RFU COR - E 008 - 2022',
        caseNature: 'Harassment',
        caseTitle: 'Sexual Harrashment',
        requestingParty: 'Milwaukee Bucks'
      },
      {
        id: 8,
        caseNo: 'SOCO RFU COR - E 009 - 2022',
        caseNature: 'Cyber crime',
        caseTitle: 'Cyber Bullying',
        requestingParty: 'New York Knicks'
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
