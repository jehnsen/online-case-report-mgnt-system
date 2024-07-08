import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredMarkerComponent } from './required-marker.component';

describe('RequiredMarkerComponent', () => {
  let component: RequiredMarkerComponent;
  let fixture: ComponentFixture<RequiredMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredMarkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
