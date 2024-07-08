import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFirearmEntryComponent } from './modal-firearm-entry.component';

describe('ModalFirearmEntryComponent', () => {
  let component: ModalFirearmEntryComponent;
  let fixture: ComponentFixture<ModalFirearmEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFirearmEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFirearmEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
