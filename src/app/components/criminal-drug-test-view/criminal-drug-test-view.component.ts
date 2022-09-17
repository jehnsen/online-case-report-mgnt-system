import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from '@angular/router'
import { DataService } from '../../services/data.service';
import { CriminalDrugTestService } from '../../services/criminal-drug-test.service';

@Component({
  selector: 'app-criminal-drug-test-view',
  templateUrl: './criminal-drug-test-view.component.html',
  styleUrls: ['./criminal-drug-test-view.component.css']
})
export class CriminalDrugTestViewComponent implements OnInit {
  selectedRecord: any;
  userData: any;
  id: any;

  constructor(private route: ActivatedRoute, private service: CriminalDrugTestService, private dataService: DataService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(window.sessionStorage.getItem('auth-user')).user;

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')
    })
    this.id = this.route.snapshot.paramMap.get('id');

    this.getSelectedDrugTestRecord(this.id);
  }

  getSelectedDrugTestRecord(id: number): void{
    this.service.getById(id).subscribe((response: any) => {
      if(response.data && Array.isArray(response.data)) {
        setTimeout(() => {  
          this.selectedRecord = response.data[0];
        }, 0);  
      }
        
    })
  }

  print(): void {
    window.print();
  }

}
