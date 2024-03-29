import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { FirearminventoryService } from 'src/app/services/firearminventory.service';

@Component({
  selector: 'app-modal-firearm-entry',
  templateUrl: './modal-firearm-entry.component.html',
  styleUrls: ['./modal-firearm-entry.component.css']
})
export class ModalFirearmEntryComponent implements OnInit {
  firearms: any = [];
  formData: FormGroup;
  isLoading: boolean = false;
  firearmTypes: Array<string> = ['REVOLVER', 'HANDGUN', 'PISTOL', 'SHOTGUN', 'RIFLE', 'CARBINE', 'ASSAULT RIFLE', 'SUB-MACHINE GUN', 'MACHINE GUN']
  selectedGunType: string;

  constructor(
    private fb: FormBuilder, 
    private fiService: FirearminventoryService, 
    private toastrService: ToastrService,
    private dataService: DataService,
    ){ }

  ngOnInit(): void {
    this.initFields()
    
  }

  onSubmit() {

    this.isLoading = true;
    const control = this.formData.controls
    const payload = {
      case_id: 0,
      case_no: 'new',
      firearm_name: control['firearmName'].value,
      cartridge: control['cartridge'].value,
      fcc: control['fcc'].value,
      fb: control['fb'].value,
      accessories: control['accessories'].value,
      fmake: control['fmake'].value,
      fcaliber: control['fcaliber'].value,
      fmodel: control['fmodel'].value,
      ftype: control['ftype'].value,
      fserial_no: control['fserialNo'].value
    }

    if (!payload.firearm_name || !payload.fmake || !payload.ftype || !payload.fserial_no) {

      this.toastrService.warning('Required Fields', 'Please fillup the required fields.');
      return;
    }

    this.fiService.create(payload).subscribe(response => {
      if (response.data) {
        console.log("response.data;", response.data);
        
        // update the state
        const { id, case_no, firearm_name, cartridge, fcc, fb, accessories, fcaliber, fmake, fmodel, ftype, fserial_no } = response.data;
        this.firearms.push({
          id,
          case_no,
          firearm_name,
          cartridge,
          fcc,
          fb,
          accessories,
          fcaliber,
          fmake,
          fmodel,
          ftype,
          fserial_no
        })
        this.dataService.setFirearmList(this.firearms)

        this.toastrService.success('Successfully save to database!', 'Firearm Entry');

        this.isLoading = false;

        this.initFields();
      }
    }, err => this.toastrService.error(err, 'Server Issue Encountered'))
  }

  selectChangeHandler(value: string){
    this.selectedGunType = value
  }

  initFields(): void {
    this.formData = this.fb.group({
      'firearmName': [''],
      'cartridge': [''],
      'fcc': [''],
      'fb': [''],
      'accessories': [''],
      'fcaliber': [''],
      'fmake': [''],
      'fmodel': [''],
      'ftype': [''],
      'fserialNo': ['']
    });
  }

}
