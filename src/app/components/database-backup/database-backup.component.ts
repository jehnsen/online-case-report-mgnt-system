import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-database-backup',
  templateUrl: './database-backup.component.html',
  styleUrls: ['./database-backup.component.css']
})
export class DatabaseBackupComponent implements OnInit {
  formData: FormGroup;
  isLoading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onBackup(): void{

  }

}
