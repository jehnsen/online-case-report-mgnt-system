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
  userDivision: string;
  userData: any;
  p: number = 1;
  public cases : any = [];
  caseTitle: any;
  id: number;

  constructor(private router: Router, private caseService: CaseService, private dataService: DataService, private toastrService: ToastrService,) { }

  ngOnInit(): void {
    this.userData = JSON.parse(window.sessionStorage.getItem('auth-user')).user;
    this.userDivision = this.userData.division;
    
    this.dataService.caseList$.subscribe((value) => {
      if(value.length > 0){
        this.cases = value
      } else {
        this.getCases(this.userDivision);
      }
    });
  }

  getCases(division: string): void {

    this.caseService.getCases().subscribe((response: any) => {
      if(response.data){
        // filter only the data for the current division
        const filtered = response.data.filter(f => f.division === this.userDivision)
        this.cases =filtered
        // store the result in state
        this.onCacheList(this.cases);
      }
      
    })
  }

  Search(){
    if(this.caseTitle == ""){
      this.getCases(this.userDivision)
    } else {
      this.cases = this.cases.filter((c: any) => {
        return c.case_no.toLocaleLowerCase().match(this.caseTitle.toLocaleLowerCase());
      });
    }
  }

  onSelectEdit(incident: any){
    this.dataService.setCase(incident)
    this.router.navigate(['/main/records/entry', incident.id]);
  }

  onCreateNew(){
    this.dataService.setCase(null)
    this.router.navigate(['/main/records/entry']);
  }
  
  onCacheList(data: any){
    this.dataService.setCaseList(data);
  }

  onSelectDelete(id: number){
    this.id = id;
  }

  onDelete(id: number){
    this.caseService.delete(id).subscribe(() => {
      this.toastrService.warning('Successfully deleted from the database!', 'Delete Record')
      // refresh the list
      this.getCases(this.userDivision)
    }, 
    err => this.toastrService.error(err, 'Server Issue Encountered'))
  }

  setPageTitle(pageTitle: string){
    this.dataService.setSelectedPage(pageTitle);
  }

}
