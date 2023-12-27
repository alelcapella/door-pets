import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDoorComponent } from './house-door.component';

describe('HouseDoorComponent', () => {
  let component: HouseDoorComponent;
  let fixture: ComponentFixture<HouseDoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseDoorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
