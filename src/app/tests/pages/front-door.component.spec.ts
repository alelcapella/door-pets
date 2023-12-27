import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

import { LockService } from '../../services/lock-service';
import { FrontDoorComponent } from '../../pages/front-door/front-door.component';
import { ModalService } from '../../services/modal-service';
import { EventEmitter } from '@angular/core';

describe('FrontDoorComponent', () => {
  let component: FrontDoorComponent;
  let fixture: ComponentFixture<FrontDoorComponent>;
  let lockServiceSpy: jasmine.SpyObj<LockService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const lockServiceSpyObj = jasmine.createSpyObj('LockService', ['getSmallLocks', 'getBigLock', 'toggleSmallLock']);
    const modalServiceSpyObj = jasmine.createSpyObj('ModalService', ['openModal', 'resetModalState', 'onModalStateChanged']);
    const matDialogSpyObj = jasmine.createSpyObj('MatDialog', ['open', 'close']);

    TestBed.configureTestingModule({
      declarations: [FrontDoorComponent],
      imports: [MatIconModule, CommonModule],
      providers: [
        { provide: LockService, useValue: lockServiceSpyObj },
        { provide: ModalService, useValue: modalServiceSpyObj },
        { provide: MatDialog, useValue: matDialogSpyObj },
      ],
    });

    fixture = TestBed.createComponent(FrontDoorComponent);
    component = fixture.componentInstance;
    lockServiceSpy = TestBed.inject(LockService) as jasmine.SpyObj<LockService>;
    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle small lock', () => {
    const index = 1;
    component.toggleLock(index);
    expect(lockServiceSpy.toggleSmallLock).toHaveBeenCalledWith(index);
  });

  it('should open dialog when big lock is open', () => {
    const openDialogSpy = spyOn(component, 'openDialog');
    lockServiceSpy.getBigLock.and.returnValue(of('lock_open'));
    lockServiceSpy.getSmallLocks.and.returnValue(of([]));

    component.ngOnInit();

    expect(openDialogSpy).toHaveBeenCalledWith('3000ms', '1500ms');
  });

  it('should close dialog when big lock is not open', () => {
    const closeDialogSpy = spyOn(component, 'closeDialog');
    lockServiceSpy.getBigLock.and.returnValue(of('lock_closed'));
    lockServiceSpy.getSmallLocks.and.returnValue(of([]));

    component.ngOnInit();

    expect(closeDialogSpy).toHaveBeenCalled();
  });

  it('should close dialog on modal state change', () => {
    const closeDialogSpy = spyOn(component, 'closeDialog');
    const modalStateChangedEmitter = new EventEmitter<void>();
    modalServiceSpy.onModalStateChanged.and.returnValue(modalStateChangedEmitter);
  
    component.ngOnInit();
    modalStateChangedEmitter.emit(); // Simulate modal state change
  
    expect(closeDialogSpy).toHaveBeenCalled();
  });

  it('should open modal and close dialog', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of('result') });
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);

    const openModalSpy = spyOn(component.modalService, 'openModal');
    const resetModalStateSpy = spyOn(component.modalService, 'resetModalState');

    component.openDialog('3000ms', '1500ms');

    expect(openModalSpy).toHaveBeenCalled();
    expect(resetModalStateSpy).not.toHaveBeenCalled();

    dialogRefSpyObj.afterClosed.next('result');

    expect(resetModalStateSpy).toHaveBeenCalled();
  });

  it('should close dialog and reset modal state', () => {
    const resetModalStateSpy = spyOn(component.modalService, 'resetModalState');
    component.dialogRef = { close: jasmine.createSpy() };

    component.closeDialog();

    expect(component.dialogRef.close).toHaveBeenCalled();
    expect(resetModalStateSpy).toHaveBeenCalled();
  });
});
