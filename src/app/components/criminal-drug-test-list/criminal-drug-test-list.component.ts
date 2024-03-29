import { Component, OnInit } from '@angular/core';
import { CriminalDrugTestService } from '../../services/criminal-drug-test.service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-criminal-drug-test-list',
  templateUrl: './criminal-drug-test-list.component.html',
  styleUrls: ['./criminal-drug-test-list.component.css']
})
export class CriminalDrugTestListComponent implements OnInit {
  p: number = 1;
  drugtests: any = []
  searchKeyword: any = []
  userData: any;
  constructor(
    private service: CriminalDrugTestService,
    private dataService: DataService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(window.sessionStorage.getItem('auth-user')).user;
    this.dataService.drugTestList$.subscribe((value) => {
      if(value.length > 0){
        this.drugtests = value
      } else {
        this.getDrugTestRecords();
      }
    });

    console.log(this.drugtests)
  }

  getDrugTestRecords(){
    this.service.get().subscribe((dtests: any) => {
      if(dtests.data){
        this.drugtests = dtests.data
        // this.dataService.setDrugTestList(this.drugtests)
      }
      
    })
  } 

  obSubmit(){

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

  setPageTitle(pageTitle: string){
    this.dataService.setSelectedPage(pageTitle);
  }

  onDelete(id: number){
    this.service.delete(id).subscribe(result => {
      this.getDrugTestRecords();
      this.toastrService.success('Criminal Drugtest Record successfully deleted!')

    })
  }

}
