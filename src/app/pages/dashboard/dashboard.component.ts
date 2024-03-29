import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/services/case.service';
import { RequesterService } from 'src/app/services/requester.service';
import { FirearminventoryService } from 'src/app/services/firearminventory.service';
import { CriminalDrugTestService } from 'src/app/services/criminal-drug-test.service';
import { DataService } from 'src/app/services/data.service';
import { Utils } from 'src/app/helpers/utils';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userDivision: string;
  userData: any;
  cases: any = [];
  requestingParties: any = [];
  locations: any = [];
  totalCases: number = 0;
  totalHackingIncident: number = 0;
  totalRobberyIncident: number = 0;
  totalShootingIncident: number = 0;
  totalDrowningIncident: number = 0;
  totalSuicideIncident: number = 0;

  totalChemistryRecords: number = 0;
  totalPhysicalRecords: number = 0;
  totalBallisticsRecords: number = 0;
  totalFingerprintRecords: number = 0;
  totalPhotogtaphyRecords: number = 0;

  firearmsInventoryCount: number = 0;
  firearmsSubmittedRate: number = 0;
  criminalDrugTestsCount: number = 0;
  criminalDrugTestsRate: number = 0;

  constructor(
    private dataService: DataService,
    private caseService: CaseService, 
    private requesterService: RequesterService,
    private firearminventoryService: FirearminventoryService,
    private criminalDrugTestService: CriminalDrugTestService
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(window.sessionStorage.getItem('auth-user')).user;
    this.userDivision = this.userData.division;



    this.getTotalCases();
    this.getRequestingParties();
    this.getFirearmsInventory();
    this.getDrugTestRecords();
  }

  getTotalCases(){

    this.dataService.caseList$.subscribe(casesResponse => {
      // if (!Utils.isEmpty(data)) {
        console.log('casesResponse', casesResponse)
        // data = this.cases
        // return ;

      // } else {
        // console.log('triggered')
        // this.caseService.getCases().subscribe(casesResponse => {

          if(casesResponse.data){
            if(this.userData.usertype === 'Administrator'){
              this.cases = casesResponse.data;
            } else {
              this.cases = casesResponse.data.filter(f => f.division === this.userDivision);
            }
            
            // this.dataService.setCaseList(this.cases);
    
            this.totalCases = this.cases.length;
            this.totalRobberyIncident = this.cases.filter(f => f.case_nature === 'Robbery').length;
            this.totalShootingIncident = this.cases.filter(s => s.case_nature === 'Shooting Incident').length;
            this.totalHackingIncident = this.cases.filter(f => f.case_nature === 'Hacking Incident').length;
            this.totalDrowningIncident = this.cases.filter(s => s.case_nature === 'Drowning').length;
            this.totalSuicideIncident = this.cases.filter(s => s.case_nature === 'Alleged Suicide').length;
    
            this.totalChemistryRecords = this.cases.filter(s => s.division === 'chemistry').length;
            this.totalPhysicalRecords = this.cases.filter(s => s.division === 'physical').length;
           
            this.totalFingerprintRecords = this.cases.filter(s => s.division === 'fingerprint').length;
            this.totalPhotogtaphyRecords = this.cases.filter(s => s.division === 'photography').length;
    
            const count = this.cases
                            .map(c => c.location)
                            .reduce((accumulator, value) => {
                              return {...accumulator, [value]: (accumulator[value] || 0) + 1};
                            }, {});
            Object.entries(count).map(i => this.locations.push({ name: i[0], count: i[1]}));
    
          }
          
        // })
      // }

    })

  }

  getRequestingParties(){
    this.dataService.requestingParties$.subscribe(cachedRequestingParties => {
      this.requestingParties = cachedRequestingParties.data;

      if(Utils.isEmpty(cachedRequestingParties.data)) {
        this.requesterService.get().subscribe(rpResponse => {
          this.requestingParties = rpResponse.data;
        })
      }
    })

  }

  getFirearmsInventory(){
    this.dataService.firearmInventoryList$.subscribe(cachedFirearmsInventoryList => {
      if(Utils.isEmpty(cachedFirearmsInventoryList.data)) {

      }
    })

    this.firearminventoryService.getInvetory().subscribe(invResponse => {
      if(invResponse.data){
        this.firearmsInventoryCount = invResponse.data.length;
        let submitted: any = 0;
        invResponse.data.map(inv => {
          if(inv.status === 'DEPOSITED TO COURT/PROSECUTOR'){
            submitted += 1;
          }
        })
        this.firearmsSubmittedRate = Math.trunc((submitted / this.firearmsInventoryCount) * 100)

        // this.dataService.setFirearmInventoryList(invResponse.data);
      }
    })
  }

  getDrugTestRecords(){
    console.log("getDrugTestRecords")
    this.criminalDrugTestService.get().subscribe((dtests: any) => {
      if(dtests.data){
        this.criminalDrugTestsCount = dtests.data.length

        let totalQtyReceived: number = 0, totalQtysubmitted: number = 0; 
        dtests.data.map(d => {
          totalQtyReceived = totalQtyReceived + Number(d.qty_received);
          totalQtysubmitted = totalQtysubmitted + Number(d.qty_turned_over);
        })
        this.criminalDrugTestsRate = Math.trunc((totalQtysubmitted / totalQtyReceived) * 100)
       
        // this.dataService.setDrugTestList(dtests.data)
      }
      
    })
  } 

}
