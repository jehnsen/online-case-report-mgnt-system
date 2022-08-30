import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {

  searchKey: string;
  requestingParties: any = []
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getRequestingParties();
  }

  getRequestingParties(): void{
    this.requestingParties = [
      {
        id: 1,
        name: 'Balbalan Municipal Police Station',
        status: 1
      },
      {
        id: 2,
        name: 'Lubuagan Municipal Police Station',
        status: 1
      },
      {
        id: 3,
        name: 'Tabuk City Police Station',
        status: 1
      },
      {
        id: 4,
        name: 'Tanudan Municipal Police Station',
        status: 1
      },
      {
        id: 5,
        name: 'Tinglayan Municipal Police Station',
        status: 1
      },
      {
        id: 6,
        name: 'Pasil Municipal Police Station',
        status: 1
      },
      {
        id: 7,
        name: 'Pinukpok, Municipal Police Station',
        status: 1
      },
      {
        id: 8,
        name: 'Rizal Municipal Police Station',
        status: 1
      },
      {
        id: 9,
        name: 'Bulanao Sub-Station',
        status: 1
      }
    ]

  }

  onSelect(partyName: any){
    this.dataService.setSelectedParty(partyName);
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

}
