import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.css']
})
export class EvidenceListComponent implements OnInit {
  evidences: any = [];
  evidenceDescription: string = '';

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  addEvidence(num: number, description: string): void{
    if(this.evidenceDescription){
      this.evidenceDescription = description;

      this.evidences.push({
        id: num,
        description: description
      })

      this.evidenceDescription = '';

    } else {
      this.toastr.warning('Please enter evidence name or description!', 'Required');
    }
    
  }

  removeEvidence(item: string){
    const index = this.evidences.indexOf(item);
    this.evidences.splice(index, 1)
  }

  onChange(inputValue: string){
    this.evidenceDescription = inputValue; 
  }

}
