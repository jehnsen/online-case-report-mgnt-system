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
  id: number;
  constructor(
    private inventoryService: FirearminventoryService, 
    private dataService: DataService, 
    private toastrService: ToastrService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.getFirearmsInventory();

    this.dataService.caseList$.subscribe((value) => {
      if(value.length > 0){
        this.firearms = value
      } else {
        this.getFirearmsInventory();
      }
    });
  }

  open() { 
    this.modalService.open(ModalFirearmEntryComponent); 
  }

  getFirearmsInventory(){
    this.inventoryService.getInvetory().subscribe((response) => {
      if(response.data){
        this.firearms = response.data
        this.dataService.setFirearmInventoryList(this.firearms);
      }
    })
  }
  
  Search(){
    if(this.firearmDescription == ""){
      this.getFirearmsInventory()
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
    this.inventoryService.delete(id).subscribe(response => {
      if(response) {
        this.toastrService.success('Deleted Successfully');

        this.getFirearmsInventory();
      }
    })
  }

  removeFirearm(id: number){

  }

}
