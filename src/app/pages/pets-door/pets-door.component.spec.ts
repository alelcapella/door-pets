import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsDoorComponent } from './pets-door.component';

describe('PetsDoorComponent', () => {
  let component: PetsDoorComponent;
  let fixture: ComponentFixture<PetsDoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsDoorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetsDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
