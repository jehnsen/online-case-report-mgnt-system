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
  isLoading: boolean = false;

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
      this.router.navigate(['/main/records'])
    }

    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.minLength(8)] )
    })
  }

  onSubmit() {
    
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveUser(data);

        this.isLoading = false;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.event.emit(this.isLoggedIn)

        this.toastr.success('Login successful!', 'Login');
        // if authentication successful, then redirect to dashboard 
        if (data.user.usertype === 'Administrator') {
          this.router.navigate(['/main/users'])
        } else {
          this.router.navigate(['/main/records'])
        }

      },
      err => {
        
        this.errorMessage = err.message;
        if(err.status == 401){
          this.errorMessage = 'Invalid Credentials';
        }
        
        this.isLoginFailed = true;
        this.event.emit(this.isLoggedIn)
        this.toastr.error(this.errorMessage, 'Login');
        this.isLoading = false;
      }
    );
  }

}
