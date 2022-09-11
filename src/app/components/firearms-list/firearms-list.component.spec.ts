import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirearmsListComponent } from './firearms-list.component';

describe('FirearmsListComponent', () => {
  let component: FirearmsListComponent;
  let fixture: ComponentFixture<FirearmsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirearmsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirearmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
