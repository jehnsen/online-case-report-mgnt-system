import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirearmsViewComponent } from './firearms-view.component';

describe('FirearmsViewComponent', () => {
  let component: FirearmsViewComponent;
  let fixture: ComponentFixture<FirearmsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirearmsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirearmsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
