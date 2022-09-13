import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  p: number = 1;
  users: any = [];

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {

    const userType = JSON.parse(window.sessionStorage.getItem('auth-user')).user.usertype;
    if(userType !== 'Administrator'){
      this.router.navigate(['/main/dashboard']);
    }

    this.getUsers();
    this.dataService.userList$.subscribe(users => {
      this.users = users;
      const sorted = this.users.sort((a,b) => b.id - a.id)
      console.log(sorted)
    })
  }

  getUsers(){
    this.authService.get().subscribe(user => {
      this.dataService.setUserList(user);
    });
  }

  onEdit(id: number): void{

  }

  onDelete(id: number){

  }

}
