import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-required-marker',
  templateUrl: './required-marker.component.html',
  styleUrls: ['./required-marker.component.css']
})
export class RequiredMarkerComponent implements OnInit {

  constructor() { }
  field: string;
  ngOnInit(): void {
  }

}
