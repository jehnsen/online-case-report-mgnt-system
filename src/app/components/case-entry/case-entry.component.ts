import { Component, ViewChild ,OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-case-entry',
  templateUrl: './case-entry.component.html',
  styleUrls: ['./case-entry.component.css']
})
export class CaseEntryComponent implements OnInit {

  caseDescription: string = '';
  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;

  
  requestingParties: any = [];
 
  constructor(private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.getRequestingParties()
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  setCurrent() {
    //Current Date
    this.dp.navigateTo()
  }
  setDate() {
    //Set specific date
    this.dp.navigateTo({ year: 2013, month: 2 });
  }

  navigateEvent(event: any) {
    this.date = event.next;
  }

  getRequestingParties(): void{
    this.requestingParties = [
      {
        id: 1,
        name: 'Balbalan Municipal Police Station',
        status: 1
      },
      {
        id: 2,
        name: 'Lubuagan Municipal Police Station',
        status: 1
      },
      {
        id: 3,
        name: 'Tabuk City Police Station',
        status: 1
      },
      {
        id: 4,
        name: 'Tanudan Municipal Police Station',
        status: 1
      },
      {
        id: 5,
        name: 'Tinglayan Municipal Police Station',
        status: 1
      },
      {
        id: 6,
        name: 'Pasil Municipal Police Station',
        status: 1
      },
      {
        id: 7,
        name: 'Pinukpok, Municipal Police Station',
        status: 1
      },
      {
        id: 8,
        name: 'Rizal Municipal Police Station',
        status: 1
      },
      {
        id: 9,
        name: 'Bulanao Sub-Station',
        status: 1
      }
    ]

  }

  


}
