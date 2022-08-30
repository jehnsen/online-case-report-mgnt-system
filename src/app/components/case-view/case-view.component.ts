import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from '@angular/router'
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.css']
})
export class CaseViewComponent implements OnInit {
  requestingParties: any = [];
  selectedCase: any;
  evidences: any;
  id: any;
  constructor(private route: ActivatedRoute, private caseService: CaseService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')
    })
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id)

    this.getSelectedCase(this.id);
  }

  getSelectedCase(id: number): void{
    this.caseService.getById(id).subscribe(response => {
      if(response.data.data && Array.isArray(response.data.data[0])) 
        this.selectedCase = response.data.data[0];
        // console.log(this.selectedCase)
        // console.log(response.data.data[0])
        setTimeout(() => {  
          this.selectedCase = response.data.data[0]
          this.evidences = response.data.evidences
        }, 0);
    })
  }

  print(): void {
    window.print();
  }

}
