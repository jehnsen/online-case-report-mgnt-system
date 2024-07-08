import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FirearminventoryService } from '../../services/firearminventory.service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalFirearmEntryComponent } from '../modals/modal-firearm-entry/modal-firearm-entry.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-firearms-list',
  templateUrl: './firearms-list.component.html',
  styleUrls: ['./firearms-list.component.css']
})
export class FirearmsListComponent implements OnInit {
  isView: boolean;
  p: number = 1;
  firearms: any = [];
  firearmDescription: any;
  selectedCase: any;
  id: number;
  baseUrl: string = environment.apiUrl;
  urlPath: string = "/storage/photos/";

  @Input() newList: any;

  constructor(
    private firearmService: FirearminventoryService, 
    private dataService: DataService, 
    private toastrService: ToastrService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.dataService.viewValue$.subscribe(value => this.isView = value);
    this.dataService.selectedCase$.subscribe((value) => {
      this.selectedCase = value;
    });

    // this.getCaseFirearms(this.selectedCase.id);

  }

  ngOnChanges(){
    this.firearms = this.newList;
  }

  open() { 
    this.modalService.open(ModalFirearmEntryComponent); 
  }

  getCaseFirearms(caseId){
    this.firearmService.getByCaseId(caseId).subscribe((response) => {
      if(response.data){
        this.firearms = response.data
      }
    })
  }

  addFireArm(firearm: any){
    this.firearms.push(firearm)
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
    this.firearmService.delete(id).subscribe(data => {
      console.log(data)
    })
  }

}
