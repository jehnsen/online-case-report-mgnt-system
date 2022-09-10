import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
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
    private authService: AuthService,
    private dataService: DataService, 
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    
    this.clearFields();

    this.dataService.userList$.subscribe(users => {
      const sorted = users.sort((a,b) => b.id - a.id)
      this.users = sorted;
    })


  }

  onSubmit(){
    console.log(this.formData.value)
    this.authService.register(this.formData.value).subscribe(response => {
      this.dataService.setUserList([...this.users, response.user]);
    })

    this.clearFields();
  }

  clearFields(){
    this.formData = this.fbuilder.group({
      'firstname': [''],
      'lastname': [''],
      'username': [''],
      'password': [''],
      'usertype': [''],
      'division': ['']
    })
  }

}
