import { Component, OnInit } from '@angular/core';
import { CriminalDrugTestService } from '../../services/criminal-drug-test.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-criminal-drug-test-list',
  templateUrl: './criminal-drug-test-list.component.html',
  styleUrls: ['./criminal-drug-test-list.component.css']
})
export class CriminalDrugTestListComponent implements OnInit {
  p: number = 1;
  drugtests: any = []
  searchKeyword: any = []
  constructor(
    private service: CriminalDrugTestService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  getDrugTestRecords(){

  }

  obSubmit(){

  }

  onDelete(id: number){

  }

  Search(){
    if(this.searchKeyword == ""){
      this.getDrugTestRecords()
    } else {
      this.drugtests = this.drugtests.filter((f: any) => {
        return f.firearm_name.toLocaleLowerCase().match(this.searchKeyword.toLocaleLowerCase());
      });
    }
  }

}
