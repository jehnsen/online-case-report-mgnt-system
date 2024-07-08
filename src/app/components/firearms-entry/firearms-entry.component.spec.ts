import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirearmsEntryComponent } from './firearms-entry.component';

describe('FirearmsEntryComponent', () => {
  let component: FirearmsEntryComponent;
  let fixture: ComponentFixture<FirearmsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirearmsEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirearmsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
