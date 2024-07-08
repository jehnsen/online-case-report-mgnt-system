import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { DataService } from '../../services/data.service';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/helpers/utils';
@Component({
  selector: 'app-firearms-view',
  templateUrl: './firearms-view.component.html',
  styleUrls: ['./firearms-view.component.css']
})
export class FirearmsViewComponent implements OnInit {

  id: any;
  formData: FormGroup;

  recordId: number = 0;
  isAdd: boolean = true;
  isViewOnly: boolean = false;
  isLoading: boolean;
  firearms: any = [];
  inventoryId: number;
  caseNumber: any;
  isUploading: boolean = false;
  encoderId: number = 1;
  data: any;
  fileData: any;
  selectedRecord: any;
  baseUrl: string = environment.apiUrl;
  urlPath: string = "/storage/photos/";
  imageUrl: string;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.clearFields();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.recordId = +params.get('id');
    })
    this.dataService.selectedFirearm$.subscribe(data => {
      this.setSelectedRecord(data);
      this.selectedRecord = data;
    })
  }

  setSelectedRecord(data) {
    this.formData = this.fb.group({
      'firearmName': data.firearm_name,
      'cartridge': data.cartridge,
      'fcc': data.fcc,
      'fb': data.fb,
      'accessories': data.accessories,
      'fcaliber': data.fcaliber,
      'fmake': data.fmake,
      'fmodel': data.fmodel,
      'ftype': data.ftype,
      'fserialNo': data.fserial_no,
      'status': data.status,
      'qty': data.qty,
    })
    this.imageUrl = this.baseUrl + this.urlPath + data.image_filename;
  }

  print(): void {
    window.print();
  }

  clearFields(): void {
    this.formData = this.fb.group({
      'firearmName': ['', Validators.required],
      'cartridge': ['', Validators.required],
      'fcc': [''],
      'fb': [''],
      'accessories': [''],
      'fcaliber': ['', Validators.required],
      'fmake': ['', Validators.required],
      'fmodel': ['', Validators.required],
      'ftype': ['', Validators.required],
      'fserialNo': [''],
      'status': [''],
      'qty': ['']
    })

    this.form = this.fb.group({
      image: [null, Validators.required]
    })
  }

  isEmpty(): boolean {
    return Utils.isEmpty(this.selectedRecord)
  }

}
