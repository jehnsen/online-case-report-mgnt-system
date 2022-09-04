import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RequesterService } from '../../services/requester.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-requester-entry',
  templateUrl: './requester-entry.component.html',
  styleUrls: ['./requester-entry.component.css']
})
export class RequesterEntryComponent implements OnInit {

  formData: FormGroup;
  requestingParties: any = [];
  isLoading: boolean = false;
  constructor(private fb: FormBuilder, private requesterService: RequesterService, private dataService: DataService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    // initialize input fields
    this.clearFields();

    this.dataService.requestingParties$.subscribe((value) => {
      this.requestingParties = value;
    });

  }

  onSubmit(){

    this.isLoading = true;

    let control = this.formData.controls
   
    const payload = {
      name: control['requestingPartyName'].value,
      address: control['address'].value
    }
    
    this.requesterService.create(payload).subscribe((response) => {
      
      this.requestingParties.push({
        id: response.data.id,
        name: response.data.name,
        address: response.data.address
      })
      this.dataService.setRequestingPartiesList(this.requestingParties);

      this.toastrService.success('Successfully save to database!', 'New Requesting Party');

      this.isLoading = false;

      this.clearFields();
    }, 
    err => this.toastrService.error(err, 'Server Issue Encountered'))
  }

  clearFields(): void{
    this.formData = this.fb.group({
      'requestingPartyName': [''],
      'address': ['']
    });
  }

}
