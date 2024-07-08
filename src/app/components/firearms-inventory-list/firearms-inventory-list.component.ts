import { Component,ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { FirearminventoryService } from 'src/app/services/firearminventory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-firearms-inventory-list',
  templateUrl: './firearms-inventory-list.component.html',
  styleUrls: ['./firearms-inventory-list.component.css']
})
export class FirearmsInventoryListComponent {

  @ViewChild('modal-firearm-entry', {static: false}) modalFirearmEntry;

  baseUrl: string = environment.apiUrl; 
  urlPath: string = "/storage/photos/";

  searchKey: string;
  firearms: any = []
  userDivision: string;
  userData: any;

  constructor(
    private firearmService: FirearminventoryService,
    private dataService: DataService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(window.sessionStorage.getItem('auth-user')).user;
    this.userDivision = this.userData.division;

    this.firearmService.getInvetory().subscribe(res => {
      this.firearms = res.data
    })


  }

  addFireArm(firearm: any){
    this.firearms.push(firearm)
  }

  onSelectEdit(id: number) {
    this.firearmService.getById(id).subscribe(data => {
      this.dataService.setSelectedFirearm(data);
    })
    
  }

  onSelectView(id: number) {
    this.firearmService.getById(id).subscribe(data => {
      this.dataService.setSelectedFirearm(data);
    })
  }

  onDelete(id: number) {
    this.firearmService.delete(id).subscribe((): any => {
      this.firearmService.getInvetory().subscribe(res => {
        this.firearms = res.data
      })
      this.toastrService.success();
    })
  }

  onSearch(searchkey){
    if(!searchkey) {
      this.firearmService.getInvetory().subscribe(res => {
        this.firearms = res.data
      })
    }
    this.firearms = this.firearms.filter(f => f.firearm_name.toLocaleLowerCase().includes(searchkey.toLocaleLowerCase()))
  }

  clearSearch(){

  }

}
