import { Component, Input, OnInit } from '@angular/core';
import { RequesterService } from '../../services/requester.service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {

  searchKey: string;
  requestingParties: any = []
  
  @Input() isAdd: boolean = false; 
  constructor(private dataService: DataService, private requesterService: RequesterService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getRequestingParties();
  }

  getRequestingParties(): void{
   
    this.requesterService.get().subscribe((response: any) => {
      this.requestingParties = response.data
      // store the result in state
      this.dataService.setRequestingPartiesList(this.requestingParties);
    })
  }

  onSelect(partyName: any){
    if(!this.isAdd){
      this.dataService.setSelectedParty(partyName);
    }
  }
  
  Search(event){
   
    if(event.length > 0){
      this.requestingParties = this.requestingParties.filter((c: any) => {
        return c.name.toLocaleLowerCase().match(this.searchKey.toLocaleLowerCase());
      });
     
    } else {
      this.getRequestingParties()
    }
  }

  onDelete(id: number){
    this.requesterService.delete(id).subscribe((response) => {
      if(response.data){
        this.toastrService.success('Successfully removed from database!', 'Delete Requesting Party');
        this.getRequestingParties();
      }
    }, 
    err => this.toastrService.error(err, 'Server Issue Encountered'))
  }

}
