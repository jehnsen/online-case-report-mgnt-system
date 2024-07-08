import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirearmsInventoryListComponent } from './firearms-inventory-list.component';

describe('FirearmsInventoryListComponent', () => {
  let component: FirearmsInventoryListComponent;
  let fixture: ComponentFixture<FirearmsInventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirearmsInventoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirearmsInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
