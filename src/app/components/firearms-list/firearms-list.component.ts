import { Component, OnInit } from '@angular/core';
import { FirearminventoryService } from '../../services/firearminventory.service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalFirearmEntryComponent } from '../modals/modal-firearm-entry/modal-firearm-entry.component';

@Component({
  selector: 'app-firearms-list',
  templateUrl: './firearms-list.component.html',
  styleUrls: ['./firearms-list.component.css']
})
export class FirearmsListComponent implements OnInit {
  p: number = 1;
  firearms: any = [];
  firearmDescription: any;
  selectedCase: any;
  id: number;
  constructor(
    private firearmService: FirearminventoryService, 
    private dataService: DataService, 
    private toastrService: ToastrService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {

    this.dataService.selectedCase$.subscribe((value) => {
      this.selectedCase = value;
    });

    this.getCaseFirearms(this.selectedCase.id);

    // this.dataService.caseList$.subscribe((value) => {
    //   if(value.length > 0){
    //     this.firearms = value
    //   } else {
    //     this.getCaseFirearms();
    //   }
    // });
  }

  open() { 
    this.modalService.open(ModalFirearmEntryComponent); 
  }

  getCaseFirearms(caseId){
    this.firearmService.getByCaseId(caseId).subscribe((response) => {
      if(response.data){
        this.firearms = response.data
        console.log(this.firearms);
        
        // this.dataService.setFirearmInventoryList(this.firearms);
      }
    })
  }
  
  Search(){
    if(this.firearmDescription == ""){
      this.getCaseFirearms(this.selectedCase.id)
    } else {
      this.firearms = this.firearms.filter((f: any) => {
        return f.firearm_name.toLocaleLowerCase().match(this.firearmDescription.toLocaleLowerCase());
      });
    }
  }

  onSelectDelete(id: number){
    this.id = id;
  }

  onDelete(id: number){
    this.firearmService.delete(id).subscribe(response => {
      if(response) {
        this.toastrService.success('Deleted Successfully');

        this.getCaseFirearms(this.selectedCase.id);
      }
    })
  }

  removeFirearm(id: number){
    // const index = this.evidences.indexOf(evidence.description);
    // this.evidences.splice(index, 1)

    this.firearmService.delete(id).subscribe(data => {
      console.log(data)
    })
  }

}
