import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons: any;
  nameSearchKey: string;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(){
    this.persons = [
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
    this.dataService.setSelectedVictim(name);
  }

  Search(event){
   
    if(event.length > 0){
      this.persons = this.persons.filter((c: any) => {
        return c.firstname.toLocaleLowerCase().match(this.nameSearchKey.toLocaleLowerCase());
      });
     
    } else {
      this.getPersons()
    }
  }

}
