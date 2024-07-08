import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectPersonsComponent } from './modal-select-persons.component';

describe('ModalSelectPersonsComponent', () => {
  let component: ModalSelectPersonsComponent;
  let fixture: ComponentFixture<ModalSelectPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelectPersonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSelectPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
