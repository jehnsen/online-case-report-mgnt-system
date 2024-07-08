import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../services/data.service';
import { CaseService } from '../../services/case.service';
@Component({
  selector: 'app-case-reports',
  templateUrl: './case-reports.component.html',
  styleUrls: ['./case-reports.component.css']
})
export class CaseReportsComponent implements OnInit {
  formData: FormGroup;
  cases: any = [];
  unfilteredCases: any = [];
  barangays: any = [];
  p: number = 1;
  location: string;
  filteredCases: any = [];

  modelTo: NgbDateStruct;
  modelFrom: NgbDateStruct;

  dateFrom: string;
  dateTo: string
  monthName: string;

  @ViewChild('dp') dp: NgbDatepicker;
  constructor(private fb: FormBuilder, private caseService: CaseService, private dataService: DataService) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      'dateTo':  ['', Validators.required],
      'dateFrom':['', Validators.required]
    });

    this.getCasesPerBarangay('', 'soco');

  }

  getCasesPerBarangay(location, division) {
    this.dataService.caseList$.subscribe((data) => {

      if(data.length > 0){

        this.unfilteredCases = data;
        this.cases = data.filter(f => f.location === location && f.division === division);
        
        this.cases = this.findOcc(this.cases, 'case_nature');
        
        data.map(b => {
          if (b.location !== null && b.division === division) {
            this.barangays.push(b.location)
          }
        })

        this.barangays = [...new Set(this.barangays)]
      }

    });
  }

  onSelect(brgy) {
    this.location = brgy
    this.getCasesPerBarangay(this.location, 'soco');
  }

  findOcc(arr, key) {
    let arr2 = [];

    arr.forEach((x) => {

      // Checking if there is any object in arr2
      // which contains the key value
      if (arr2.some((val) => { return val[key] == x[key] })) {

        // If yes! then increase the occurrence by 1
        arr2.forEach((k) => {
          if (k[key] === x[key]) {
            k["occurrence"]++
          }
        })

      } else {
        // If not! Then create a new object initialize 
        // it with the present iteration key's value and 
        // set the occurrence to 1
        let a = {}
        a[key] = x[key]
        a["occurrence"] = 1
        arr2.push(a);
      }
    })

    return arr2
  }
  
  onDateSelectFrom(event) {
    let year = event.year,
      month = event.month <= 9 ? '0' + event.month : event.month,
      day = event.day <= 9 ? '0' + event.day : event.day;
    this.dateFrom = `${month}/${day}/${year}`;
    this.onSearch();
    
  }

  onDateSelectTo(event) {
    let year = event.year,
      month = event.month <= 9 ? '0' + event.month : event.month,
      day = event.day <= 9 ? '0' + event.day : event.day;
    this.dateTo = `${month}/${day}/${year}`;
    this.onSearch();
  }



  onSearch(){
    let startDate = new Date(this.dateFrom),
        endDate = new Date(this.dateTo);
        
    this.monthName = startDate.toLocaleString('default', { month: 'long' });

    this.filteredCases = this.unfilteredCases
        .filter(c => c.division === 'soco')
        .filter(d => {
          var time = new Date(d.incident_date);
          return (startDate <= time && time < endDate);
        });

  }

  print(){
    var print_div = document.getElementById("case-table");
    var print_area = window.open();
    print_area.document.write(print_div.innerHTML);
    print_area.document.close();
    print_area.focus();
    print_area.print();
    print_area.close();
  }

}
