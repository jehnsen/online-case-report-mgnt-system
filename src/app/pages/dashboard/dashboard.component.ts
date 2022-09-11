import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/services/case.service';
import { RequesterService } from 'src/app/services/requester.service';
import { FirearminventoryService } from 'src/app/services/firearminventory.service';
import { DataService } from 'src/app/services/data.service';
import { map } from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cases: any = [];
  requestingParties: any = [];
  locations: any = [];
  totalCases: number = 0;
  totalHackingIncident: number = 0;
  totalRobberyIncident: number = 0;
  totalShootingIncident: number = 0;
  totalDrowningIncident: number = 0;
  totalSuicideIncident: number = 0;

  firearmsInventlory: any = [];

  constructor(
    private dataService: DataService,
    private caseService: CaseService, 
    private requesterService: RequesterService,
    private firearminventoryService: FirearminventoryService
  ) { }

  ngOnInit(): void {
    this.getTotalCases();
    this.getRequestingParties();
    this.getFirearmsInventory();
  }

  getTotalCases(){
    this.caseService.getCases().subscribe(casesResponse => {

      if(casesResponse.data){
        this.cases = casesResponse.data;
        this.dataService.setCaseList(this.cases);

        this.totalCases = this.cases.length;
        this.totalRobberyIncident = this.cases.filter(f => f.case_nature === 'Robbery').length;
        this.totalShootingIncident = this.cases.filter(s => s.case_nature === 'Shooting Incident').length;
        this.totalHackingIncident = this.cases.filter(f => f.case_nature === 'Hacking Incident').length;
        this.totalDrowningIncident = this.cases.filter(s => s.case_nature === 'Drowning').length;
        this.totalSuicideIncident = this.cases.filter(s => s.case_nature === 'Alleged Suicide').length;

        const count = this.cases
                        .map(c => c.location)
                        .reduce((accumulator, value) => {
                          return {...accumulator, [value]: (accumulator[value] || 0) + 1};
                        }, {});
        Object.entries(count).map(i => this.locations.push({ name: i[0], count: i[1]}));

      }
      
    })
  }

  getRequestingParties(){
    this.requesterService.get().subscribe(rpResponse => {
      this.requestingParties = rpResponse.data;
    })
  }

  getFirearmsInventory(){
    this.firearminventoryService.getInvetory().subscribe(invResponse => {
      if(invResponse.data){
        this.dataService.setFirearmInventoryList(invResponse.data);
      }
    })
  }

}
