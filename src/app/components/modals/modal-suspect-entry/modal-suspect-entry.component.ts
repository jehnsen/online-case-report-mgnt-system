import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SuspectService } from '../../../services/suspect.service';
import { DataService } from '../../../services/data.service';
@Component({
  selector: 'app-modal-suspect-entry',
  templateUrl: './modal-suspect-entry.component.html',
  styleUrls: ['./modal-suspect-entry.component.css']
})
export class ModalSuspectEntryComponent implements OnInit {

  formData: FormGroup;
  suspects: any = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private suspectService: SuspectService,
    private dataService: DataService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.clearFields();

    this.dataService.suspectList$.subscribe((value) => {
      this.suspects = value;
    });
  }

  addSuspect() {

    this.isLoading = true;

    const control = this.formData.controls
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

    this.suspectService.create(payload).subscribe(response => {
      if (response.data) {
        // update the state
        const { id, case_id, firstname, middlename, lastname, address, age, gender, civil_status } = response.data;
        this.suspects.unshift({
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
        this.dataService.setSuspectsList(this.suspects);

        this.toastrService.success('Successfully save to database!', 'Suspect Entry');

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