import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserRegistrationComponent } from './modal-user-registration.component';

describe('ModalUserRegistrationComponent', () => {
  let component: ModalUserRegistrationComponent;
  let fixture: ComponentFixture<ModalUserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUserRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
