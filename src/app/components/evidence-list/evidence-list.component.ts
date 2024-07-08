import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service';
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.css']
})
export class EvidenceListComponent implements OnInit {
  
  evidenceDescription: string = '';
  @Input() caseId: number;
  // @Input() 
  evidences: any = [];
  @Output() onSelected = new EventEmitter<any>();

  constructor(private toastr: ToastrService, private dataService: DataService, private caseService: CaseService) { }

  ngOnInit(): void {

    this.dataService.evidenceList$.subscribe((value) => {
      this.evidences = value;
    });

  }

  addEvidence(num: number, description: string): void {

    this.evidences.push({ case_id: this.caseId, description: description })

     

    // update the evidence list in state
    this.dataService.setEvidenceList(this.evidences)

    this.evidenceDescription = '';
    
    // if (this.evidenceDescription) {
    //   // if in edit mode
    //   if(this.caseId > 0) {
    //     // update also the evidences
    //     this.caseService.insertEvidenceDuringUpdate({ case_id: this.caseId, description: description })
    //       .subscribe(res => console.log("insertEvidence",res))
    //   }
    //   this.evidenceDescription = description;
    //   // this.dataService.setEvidence(num, description);
    //   // this.dataService.setEvidenceList([...this.evidences, { case_id: this.caseId, description: description }])

    //   this.evidenceDescription = '';

    // } else {
    //   this.toastr.warning('Please enter evidence name or description!', 'Required');
    // }

    // this.dataService.evidenceList$.subscribe(ev => this.evidences = ev)

  }

  removeEvidence(evidence: any) {
    const index = this.evidences.indexOf(evidence.description);
    this.evidences.splice(index, 1)

    // if in edit mode
    if(this.caseId > 0) {
      // delete also the evidences from database
      this.caseService.deleteEvidence(evidence.id)
        .subscribe(data => {
            console.log(data)
        })
    }

  }

  onChange(inputValue: string) {
    this.evidenceDescription = inputValue;
  }

}
