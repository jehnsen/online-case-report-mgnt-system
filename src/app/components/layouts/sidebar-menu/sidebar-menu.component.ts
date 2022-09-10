import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  count: number;
  isMobileView: boolean = false;
  division: string;

  constructor(private tokenStorageService: TokenStorageService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {

    this.division = JSON.parse(window.sessionStorage.getItem('auth-user')).user.division;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      this.isMobileView = true;
    }

    this.dataService.caseList$.subscribe((value) => {
      this.count = value.length
    });
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/'])
  }

  onPageResize(){
    const resizeObserver = new ResizeObserver(function(entries) {
      // since we are observing only a single element, so we access the first element in entries array
      let rect = entries[0].contentRect;
    
      // current width & height
      let width = rect.width;
      let height = rect.height;
    
      console.log('Current Width : ' + width);
      console.log('Current Height : ' + height);
    });

    // start observing for resize
    resizeObserver.observe(document.querySelector("#demo-textarea"));
  }
}
