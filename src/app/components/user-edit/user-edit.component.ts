import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router  } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  formData: FormGroup;
  isLoading: boolean;
  userData: any;
  id: number;

  constructor(
    private fbuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
    })
   
    this.formData = this.fbuilder.group({
      'firstname': [''],
      'lastname': [''],
      'username': [''],
      'usertype': [''],
      'division': ['']
    })

    this.dataService.userList$.subscribe(list => {
      this.userData = list.find(l => l.id === this.id)

      this.formData.setValue({
        'firstname': this.userData['firstname'],
        'lastname': this.userData['lastname'],
        'username': this.userData['username'],
        'usertype': this.userData['usertype'],
        'division': this.userData['division']
      })
    })

  }

  onSubmit(){
    this.authService.update({...this.formData.value, id: this.id}).subscribe(response => {
      if(response) this.toastrService.success('Successfully updated!', 'Update')
    })
  }

}
