import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VictimService } from '../../../services/victim.service';
import { DataService } from '../../../services/data.service';
@Component({
  selector: 'app-modal-victim-entry',
  templateUrl: './modal-victim-entry.component.html',
  styleUrls: ['./modal-victim-entry.component.css']
})
export class ModalVictimEntryComponent implements OnInit {

  formData: FormGroup;
  victims: any = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private victimService: VictimService,
    private dataService: DataService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.clearFields();

    this.dataService.victimList$.subscribe((value) => {
      this.victims = value;
    });
  }

  addVictim() {

    this.isLoading = true;

    const control = this.formData.controls
    const division = JSON.parse(window.sessionStorage.getItem('auth-user')).user.division;
    const payload = {
      case_id: 0,
      firstname: control['firstname'].value,
      middlename: control['middlename'].value,
      lastname: control['lastname'].value,
      address: control['address'].value,
      age: control['age'].value,
      gender: control['gender'].value,
      civil_status: control['civilStatus'].value
    }

    if (!payload.firstname || !payload.lastname || !payload.gender) {
      this.toastrService.warning("Please fillup all required fields!", 'Validation Warning')
      return;
    }

    this.victimService.create(payload).subscribe(response => {
      if (response.data) {
        // update the state
        const { id, case_id, firstname, middlename, lastname, address, age, gender, civil_status } = response.data;
        this.victims.unshift({
          id,
          case_id,
          firstname,
          middlename,
          lastname,
          address,
          age,
          civil_status,
          gender
        })
        this.dataService.setVictimsList(this.victims);

        this.toastrService.success('Successfully saved to database!', 'Victim Entry');

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
