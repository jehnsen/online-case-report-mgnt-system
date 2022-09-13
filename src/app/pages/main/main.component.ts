import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ngResizeObserverProviders, NgResizeObserver } from 'ng-resize-observer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [...ngResizeObserverProviders]
})
export class MainComponent implements OnInit {

  width$ = this.resize$.pipe(map(entry => entry.contentRect.width));

  constructor(private resize$: NgResizeObserver) {}

  ngOnInit(): void {
    
  }

}
