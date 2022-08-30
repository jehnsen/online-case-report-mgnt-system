import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { CaseService } from '../../services/case.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css']
})
export class CaseListComponent implements OnInit {
  p: number = 1;
  public cases : any = [];
  caseTitle: any;
  constructor(private router: Router, private caseService: CaseService, private dataService: DataService, private toastrService: ToastrService,) { }

  ngOnInit(): void {
    this.dataService.caseList$.subscribe((value) => {
      if(value.length > 0){
        this.cases = value
      } else {
        this.getCases();
      }
    });
   
    
  }

  getCases(): void {
    this.caseService.getCases().subscribe((response: any) => {
      this.cases = response.data
      // store the result in state
      this.onCacheList(this.cases);
    })
  }

  Search(){
    if(this.caseTitle == ""){
      this.getCases()
    } else {
      this.cases = this.cases.filter((c: any) => {
        return c.incident_title.toLocaleLowerCase().match(this.caseTitle.toLocaleLowerCase());
      });
    }
  }

  onSelectEdit(incident: any){
    this.dataService.setCase(incident)
    this.router.navigate(['/main/cases/entry', incident.id]);
  }

  onCreateNew(){
    this.dataService.setCase(null)
    this.router.navigate(['/main/cases/entry']);
  }
  
  onCacheList(data: any){
    this.dataService.setCaseList(data);
  }

  onDelete(id: number){
    this.caseService.delete(id).subscribe(() => {
      this.toastrService.warning('Incident/Event was successfully deleted!', 'Delete Incident Record')
      // refresh the list
      this.getCases()
    }, 
    err => this.toastrService.error(err, 'Server Issue Encountered'))
  }

}
