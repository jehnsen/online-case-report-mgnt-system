import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user-update-password',
  templateUrl: './user-update-password.component.html',
  styleUrls: ['./user-update-password.component.css']
})
export class UserUpdatePasswordComponent implements OnInit {

  formData: FormGroup;
  users: any = [];
  isLoading: boolean = false;
  userData: any;

  constructor(
    private fbuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService, 
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(window.sessionStorage.getItem('auth-user')).user;
    console.log(this.userData)
    this.formData = this.fbuilder.group({
      'current_password': [''],
      'new_password': [''],
      'confirm_password': ['']
    })
  }

  onSubmit(){
    if(!this.formData.value.new_password || !this.formData.value.confirm_password){
      this.toastrService.warning('Please fill required fields!');
      return;
    }
    if(this.formData.value.new_password !== this.formData.value.confirm_password){
      this.toastrService.warning('Your newly entered password and confirmation password do not match. \n\n Please try agagin');
      return;
    }

    this.authService.updatePassword(this.userData.id, this.formData.value.new_password).subscribe(() => {
      this.toastrService.success('Your password has been successfully updated!')
    })
  }

}
