import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterEntryComponent } from './requester-entry.component';

describe('RequesterEntryComponent', () => {
  let component: RequesterEntryComponent;
  let fixture: ComponentFixture<RequesterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequesterEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequesterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
