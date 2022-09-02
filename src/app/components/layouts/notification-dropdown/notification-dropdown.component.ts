import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.css']
})
export class NotificationDropdownComponent implements OnInit {
  sessionData: any;

  constructor() { }

  ngOnInit(): void {
    this.sessionData = JSON.parse(window.sessionStorage.getItem('auth-user'))
  }

}
