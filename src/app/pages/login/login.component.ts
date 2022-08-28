import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from '../../services/auth.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage = '';
  roles: string[] = [];

  loginForm: FormGroup;

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService
  ) { }

  @Output() event = new EventEmitter<boolean>()

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/dashboard'])
    }

    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.minLength(8)] )
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        console.log(data);
        
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.event.emit(this.isLoggedIn)

        this.toastr.success('Login successful!', 'Login');
        // if authentication successful, then redirect to dashboard 
        this.router.navigate(['/dashboard'])
      },
      err => {
        console.log(err);
        
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.event.emit(this.isLoggedIn)
        this.toastr.error(this.errorMessage, 'Login');
      }
    );
  }

}
