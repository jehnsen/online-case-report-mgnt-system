import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.css']
})
export class EvidenceListComponent implements OnInit, AfterViewInit {
  evidences: any = [];
  evidenceDescription: string = '';
  @Input() evidenceList = [];
  @Output() onSelected = new EventEmitter<any>();

  constructor(private toastr: ToastrService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.productList$.subscribe((value) => {
      this.evidenceList = value;
    });
    
  }

  ngAfterViewInit() {
    this.evidences = this.evidenceList;
  }

  // onSelectedProduct(num: number, description: string): void {

  //   if(this.evidenceDescription){
  //     this.evidenceDescription = description;
  //     this.dataService.setProduct(num, description);
      
  //     this.evidenceDescription = '';

  //   } else {
  //     this.toastr.warning('Please enter evidence name or description!', 'Required');
  //   }
    
  // }


  addEvidence(num: number, description: string): void{
    if(this.evidenceDescription){
      this.evidenceDescription = description;
      this.dataService.setProduct(num, description);
      
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
