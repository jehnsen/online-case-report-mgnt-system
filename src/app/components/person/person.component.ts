import { Component, Input, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  p: number = 1;
  persons: any;
  nameSearchKey: string;

  @Input() isAdd: boolean = false;
  constructor(private dataService: DataService, private personService: PersonService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.p = 1;
    this.getPersons();
  }

  getPersons(){
    this.personService.get().subscribe((response: any) => {
      this.persons = response.data
      const sorted = this.persons.sort((a,b) => b.id - a.id)
      // store the result in state
      this.dataService.setVictimsList(sorted);
    })
  }

  onSelect(name: any){
    // disable selection in entry page
    if(!this.isAdd){
      this.dataService.setSelectedVictim(name);
    }
  }

  onDelete(id: number){
    this.personService.delete(id).subscribe((response: any) => {
      if(response.data){
        this.toastrService.success('Successfully removed from database!', 'Delete');
        this.getPersons();
      }
    }, err => this.toastrService.error(err, 'Server Issue Encountered'));
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
