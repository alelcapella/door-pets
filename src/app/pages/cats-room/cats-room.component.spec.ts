import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsRoomComponent } from './cats-room.component';

describe('CatsRoomComponent', () => {
  let component: CatsRoomComponent;
  let fixture: ComponentFixture<CatsRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatsRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatsRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
