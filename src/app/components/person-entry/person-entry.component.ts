import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from '../../services/person.service';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-person-entry',
  templateUrl: './person-entry.component.html',
  styleUrls: ['./person-entry.component.css']
})
export class PersonEntryComponent implements OnInit {

  formData: FormGroup;
  persons: any = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private personService: PersonService, 
    private dataService: DataService, 
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    
    this.clearFields();

    this.dataService.victimList$.subscribe((value) => {
      this.persons = value;
    });
  }

  onSubmit(){

    this.isLoading = true;

    let control = this.formData.controls
   
    const payload = {
      firstname: control['firstname'].value,
      middlename: control['middlename'].value,
      lastname: control['lastname'].value,
      address: control['address'].value,
      age: control['age'].value,
      gender: control['gender'].value,
      civil_status: control['civilStatus'].value
    }
    console.log(payload);
    
    this.personService.create(payload).subscribe((response) => {
      if(response.data){
        // update the state
        const { id, firstname, middlename, lastname, address, age, gender, civil_status } = response.data;
        this.persons.unshift({
          id,
          firstname,
          middlename,
          lastname,
          address,
          age,
          civil_status,
          gender
        })
        this.dataService.setVictimsList(this.persons);

        this.toastrService.success('Successfully save to database!', 'New Requesting Party');

        this.isLoading = false;

        this.clearFields();
      }
    }, 
    err => this.toastrService.error(err, 'Server Issue Encountered'))
  }

  clearFields(): void {
    this.formData = this.fb.group({
      'firstname': [''],
      'middlename': [''],
      'lastname': [''],
      'address': [''],
      'age': [''],
      'gender': [''],
      'civilStatus': ['']
    });
  }

}
