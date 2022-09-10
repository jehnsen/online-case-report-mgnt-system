import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { PersonService } from '../../services/person.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-modal-user-registration',
  templateUrl: './modal-user-registration.component.html',
  styleUrls: ['./modal-user-registration.component.css']
})
export class ModalUserRegistrationComponent implements OnInit {

  formData: FormGroup;
  users: any = [];
  isLoading: boolean = false;

  constructor(
    private fbuilder: FormBuilder,
    private dataService: DataService, 
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    
    this.clearFields();


  }

  onSubmit(){

  }
  
  clearFields(){
    this.formData = this.fbuilder.group({
      'firstname': [''],
      'lastname': [''],
      'username': [''],
      'password': [''],
      'usertype': ['']
    })
  }

}
