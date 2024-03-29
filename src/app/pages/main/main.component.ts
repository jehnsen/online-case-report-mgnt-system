import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ngResizeObserverProviders, NgResizeObserver } from 'ng-resize-observer';
import { CaseService } from 'src/app/services/case.service';
import { CriminalDrugTestService } from 'src/app/services/criminal-drug-test.service';
import { DataService } from 'src/app/services/data.service';
import { FirearminventoryService } from 'src/app/services/firearminventory.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [...ngResizeObserverProviders]
})
export class MainComponent implements OnInit {

  width$ = this.resize$.pipe(map(entry => entry.contentRect.width));
  userDivision: string;

  cases: any = [];

  constructor(
    private resize$: NgResizeObserver,
    private dataService: DataService,
    private caseService: CaseService,
    private criminalDrugTestService: CriminalDrugTestService,
    private fireArmsInventoryService: FirearminventoryService
    ) {}

  ngOnInit(): void {
    this.userDivision = JSON.parse(window.sessionStorage.getItem('auth-user')).user.division;
    this.getTotalCases();

    // if(this.userDivision === 'chemistry'){
      
    // }

    switch (this.userDivision) {

      case 'physical':
        this.fireArmsInventoryService.getInvetory()
          .subscribe(fi => {
            this.dataService.setFirearmInventoryList(fi.data)
          })
        break;

      case 'chemistry':
        this.getDrugTestRecords();
        break;
    }

  }

  getTotalCases(){
    this.caseService.getCases().subscribe(casesResponse => {

      if(casesResponse.data){
        this.cases = casesResponse.data.filter(f => f.division === this.userDivision);
        this.dataService.setCaseList(this.cases);

      }
      
    })
  }

  getDrugTestRecords(){
    this.criminalDrugTestService.get().subscribe(dtests => {
      console.log('dtests.data',dtests.data)
      if(dtests.data){
        this.dataService.setDrugTestList(dtests.data)
      }
    })
  }

}
