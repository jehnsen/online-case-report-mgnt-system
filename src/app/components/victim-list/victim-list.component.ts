import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-victim-list',
  templateUrl: './victim-list.component.html',
  styleUrls: ['./victim-list.component.css']
})
export class VictimListComponent implements OnInit {
  victims = [];
  constructor() { }

  ngOnInit(): void {
  }

  addVictim(data) {

  }

  removeVictim(id: number) {

  }

}
