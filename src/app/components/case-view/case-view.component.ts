import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from '@angular/router';
import { Router } from '@angular/router';
import { CaseService } from '../../services/case.service';
import { DataService } from '../../services/data.service';
import { FileService } from '../../services/file.service';
import { VictimService } from 'src/app/services/victim.service';
import { SuspectService } from 'src/app/services/suspect.service';
import { FirearminventoryService } from 'src/app/services/firearminventory.service';
import { Utils } from 'src/app/helpers/utils';
@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.css']
})
export class CaseViewComponent implements OnInit {
  requestingParties: any = [];
  selectedCase: any;
  evidences: any = [];
  files: any = [];
  victims: any = [];
  firearms: any = [];
  suspects: any = [];
  id: any;
  userDivision: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private caseService: CaseService, 
    private dataService: DataService,  
    private faService: FirearminventoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')
    })
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.userDivision = JSON.parse(window.sessionStorage.getItem('auth-user')).user.division;

    // view mode
    this.dataService.setIsViewValue(true);
    this.getSelectedCase(this.id);

    if (this.userDivision === 'ballistic'){
          this.getFirearms(this.id);
    }


  }

  getSelectedCase(id: number): void{
    this.caseService.getById(id).subscribe(response => {
      if(response.data.data && Array.isArray(response.data.data[0])) 
        this.selectedCase = response.data.data[0];
        setTimeout(() => {  
          this.selectedCase = response.data.data[0]
          this.evidences  = response.data.evidences
          this.victims    = response.data.victims
          this.suspects   = response.data.suspects
          this.files      = response.data.files

        }, 0);

        // update the state
        this.dataService.setFilesList(response.data.files);
        this.dataService.setVictimsList(response.data.victims);
        this.dataService.setSuspectsList(response.data.suspects);
    })
  }

  getFirearms(id: number): void {
    this.faService.getByCaseId(id).subscribe(response => {
      if(response.data && Array.isArray(response.data)) {
        this.firearms = response.data
        this.dataService.setFirearmList(response.data);
      }
    })
  }

  isEmpty(array): boolean {
    return Utils.isEmpty(array)
  }

  print(): void {
    window.print();
  }

  onSelectEdit(id: number){
    this.dataService.setCase(id)
    this.router.navigate(['/main/records/entry', id]);
    this.dataService.setSelectedPage("UPDATE DETAILS")
    // this.setPageTitle("UPDATE DETAILS");
  }

}
