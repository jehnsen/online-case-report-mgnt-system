import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-suspect',
  templateUrl: './suspect.component.html',
  styleUrls: ['./suspect.component.css']
})
export class SuspectComponent implements OnInit {
  suspects: any;
  nameSearchKey: string;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getSuspects();
  }

  getSuspects(){
    this.suspects = [
      {
        id: 1,
        firstname: 'JOHN',
        lastname: 'WICK',
        address: 'LUBUAGAN, TABUK, KALINGA'
      },
      {
        id: 1,
        firstname: 'DECKARD',
        lastname: 'SHAW',
        address: 'TABUK CITY, KALINGA'
      },
      {
        id: 1,
        firstname: 'JASON',
        lastname: 'BOURNE',
        address: 'BULANAO, TABUK, KALINGA'
      },
      {
        id: 1,
        firstname: 'JAMES',
        lastname: 'BOND',
        address: 'POBLACION, TABUK, KALINGA'
      },
      {
        id: 1,
        firstname: 'ETHAN',
        lastname: 'HUNT',
        address: 'RIZAL, TABUK, KALINGA'
      },
      {
        id: 1,
        firstname: 'JOHN',
        lastname: 'MCLAIN',
        address: 'TANUDAN, TABUK, KALINGA'
      },
      {
        id: 1,
        firstname: 'JOHN',
        lastname: 'RAMBO',
        address: 'TINGLAYAN, TABUK, KALINGA'
      }
    ]
  }

  onSelect(name: any){
    this.dataService.setSelectedSuspect(name);
  }

  Search(event){
   
    if(event.length > 0){
      this.suspects = this.suspects.filter((c: any) => {
        return c.firstname.toLocaleLowerCase().match(this.nameSearchKey.toLocaleLowerCase());
      });
     
    } else {
      this.getSuspects()
    }
  }

}
