import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from '@angular/router'
import { CaseService } from '../../services/case.service';
import { DataService } from '../../services/data.service';
import { FileService } from '../../services/file.service';
import { VictimService } from 'src/app/services/victim.service';
import { SuspectService } from 'src/app/services/suspect.service';
@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.css']
})
export class CaseViewComponent implements OnInit {
  requestingParties: any = [];
  selectedCase: any;
  evidences: any;
  files: [];
  victims: [];
  suspects: [];
  id: any;
  userDivision: string;

  constructor(
    private route: ActivatedRoute, 
    private caseService: CaseService, 
    private dataService: DataService,  
    private fileService: FileService,
    private victimService: VictimService,
    private suspectService: SuspectService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')
    })
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.userDivision = JSON.parse(window.sessionStorage.getItem('auth-user')).user.division;

    // view mode
    this.dataService.setIsViewValue(true);
    this.getSelectedCase(this.id);
    this.getVictims(this.id)
    this.getSuspects(this.id)

    this.fileService.getFiles(this.id).subscribe((response: any) => {
      // update the state
      this.dataService.setFilesList(response.data);
    })

  }

  getSelectedCase(id: number): void{
    this.caseService.getById(id).subscribe(response => {
      if(response.data.data && Array.isArray(response.data.data[0])) 
        this.selectedCase = response.data.data[0];
        setTimeout(() => {  
          this.selectedCase = response.data.data[0]
          this.evidences = response.data.evidences
        }, 0);
    })
  }

  getVictims(id: number): void {
    this.victimService.getByCaseId(id).subscribe(response => {
      if(response.data && Array.isArray(response.data)) {
        this.victims = response.data
        console.log(response.data)
        this.dataService.setVictimsList(response.data);
      }
    })
  }

  getSuspects(id: number): void {
    this.suspectService.getByCaseId(id).subscribe(response => {
      if(response.data && Array.isArray(response.data)) {
        this.suspects = response.data
        this.dataService.setSuspectsList(response.data);
      }
    })
  }


  print(): void {
    window.print();
  }

}
