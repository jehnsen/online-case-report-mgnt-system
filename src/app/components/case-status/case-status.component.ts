import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-status',
  templateUrl: './case-status.component.html',
  styleUrls: ['./case-status.component.css']
})
export class CaseStatusComponent implements OnInit {

  @Input() value: string;
  constructor() { }

  ngOnInit(): void {

  }

  getClass(value) {

    return {
      'badge': true,
      'text-wrap': true,
      'badge-success': value === 'Convicted',
      'badge-danger': value === 'Sealed',
      'badge-info': value === 'Vacated',
      'badge-warning': value !== 'Convicted' && value !== 'Sealed' && value !== 'Vacated'
    }

  }

}
