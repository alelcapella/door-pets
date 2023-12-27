import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalOpenDoorComponent } from './modal-open-door.component';

describe('ModalOpenDoorComponent', () => {
  let component: ModalOpenDoorComponent;
  let fixture: ComponentFixture<ModalOpenDoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOpenDoorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalOpenDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
