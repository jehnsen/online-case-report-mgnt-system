import { Component, OnInit } from '@angular/core';
import { FirearminventoryService } from '../../services/firearminventory.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-firearms-list',
  templateUrl: './firearms-list.component.html',
  styleUrls: ['./firearms-list.component.css']
})
export class FirearmsListComponent implements OnInit {
  p: number = 1;
  firearms: any = [];
  firearmDescription: any;
  constructor(private inventoryService: FirearminventoryService, private dataService: DataService) { }

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

  onDelete(id: number){

  }

}