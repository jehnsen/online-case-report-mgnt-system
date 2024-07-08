import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router  } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DispositionService } from '../../services/disposition.service';

@Component({
  selector: 'app-disposition-form',
  templateUrl: './disposition-form.component.html',
  styleUrls: ['./disposition-form.component.css']
})
export class DispositionFormComponent implements OnInit {
  
  formData: FormGroup;
  dispositions: any = [];
  isLoading: boolean = false;
  p: number = 1;
  constructor(private service: DispositionService, private toastr: ToastrService, private fbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    const userType = JSON.parse(window.sessionStorage.getItem('auth-user')).user.usertype;
    if(userType !== 'Administrator'){
      this.router.navigate(['/main/dashboard']);
    }

    this.clearFields();

    this.getDispositions();
  }

  getDispositions(){
    this.service.getDispositions().subscribe((response: any) => {
      if(response?.data) 
        this.dispositions = response.data;
    }, err => this.toastr.error(err))
  }

  onSubmit(){
    this.isLoading = true;
    this.service.create(this.formData.value).subscribe((response: any) => {
        if(response?.data){
          this.getDispositions();
          this.toastr.success("Successfully added to database!");
          this.clearFields();
          this.isLoading = false;
        }
    }, () => {
      this.toastr.error("Failed to save in database.");
      this.isLoading = false;
    })

    
  }

  onDelete(id: number){
    this.service.delete(id).subscribe((response: any) => {
      if(response?.data){
        this.toastr.success("Successfully Deleted!")
      }
    }, err => this.toastr.error(err))

    this.getDispositions();
  }

  clearFields():void {
    this.formData = this.fbuilder.group({'dispositionName': [''], 'division': ['']})
  }

  getClass(value) {

    return {
      'badge': true,
      'text-wrap': true,
      'bg-maroon': value === 'soco',
      'bg-indigo': value === 'physical',
      'bg-teal': value === 'chemistry',
      'bg-fuchsia': value === 'fingerprint',
      'bg-purple': value === 'ballistic',
      'bg-lightblue': value === 'photography'
    }

  }

}
