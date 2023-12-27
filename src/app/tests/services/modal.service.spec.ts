import { TestBed } from '@angular/core/testing';
import { ModalService } from '../../services/modal-service';

describe('ModalService', () => {
  let modalService: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService],
    });

    modalService = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(modalService).toBeTruthy();
  });

  it('should open modal and emit event', () => {
    spyOn((modalService as any)['modalStateChanged'], 'emit');
    spyOn(modalService, 'saveModalStateToLocalStorage' as any);

    modalService.openModal();

    expect((modalService as any)['modalStateChanged'].emit).toHaveBeenCalled();
    expect(modalService.saveModalStateToLocalStorage).toHaveBeenCalledWith(true);
    expect(modalService.modalState).toBeTruthy();
  });

  it('should reset modal state', () => {
    spyOn(modalService, 'saveModalStateToLocalStorage' as any);

    modalService.resetModalState();

    expect(modalService.saveModalStateToLocalStorage).toHaveBeenCalledWith(false);
    expect(modalService.modalState).toBeFalsy();
  });

});
