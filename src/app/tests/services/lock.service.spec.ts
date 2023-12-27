import { TestBed } from '@angular/core/testing';
import { LockService } from '../../services/lock-service';
import { BehaviorSubject } from 'rxjs';

describe('LockService', () => {
  let lockService: LockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LockService],
    });

    lockService = TestBed.inject(LockService);
  });

  it('should be created', () => {
    expect(lockService).toBeTruthy();
  });

  it('should toggle small lock and update big lock', () => {
    const initialSmallLocks = new BehaviorSubject<string[]>(['lock', 'lock', 'lock']);
    const initialBigLock = new BehaviorSubject<string>('lock');
    spyOnProperty(lockService as any, 'smallLocks').and.returnValue(initialSmallLocks);
    spyOn(initialSmallLocks, 'next');
    spyOnProperty(lockService as any, 'bigLock').and.returnValue(initialBigLock);
    spyOn(initialBigLock, 'next');

    lockService.toggleSmallLock(0);

    expect(initialSmallLocks.value).toEqual(['lock_open', 'lock', 'lock']);
    expect(initialSmallLocks.next).toHaveBeenCalledWith(['lock_open', 'lock', 'lock']);
    expect(initialBigLock.next).toHaveBeenCalledWith('lock');
  });

  it('should toggle house lock', () => {
    const initialHouseLocks = new BehaviorSubject<string[]>(['lock', 'lock', 'lock_open', 'lock', 'lock']);
    spyOnProperty(lockService as any, 'houseLocks').and.returnValue(initialHouseLocks);
    spyOn(initialHouseLocks, 'next');

    lockService.toggleHouseLock(2);

    expect(initialHouseLocks.value).toEqual(['lock', 'lock', 'lock', 'lock', 'lock']);
    expect(initialHouseLocks.next).toHaveBeenCalledWith(['lock', 'lock', 'lock', 'lock', 'lock']);
  });

  it('should toggle password lock', () => {
    const initialPasswordLock = new BehaviorSubject<string>('lock');
    spyOnProperty(lockService as any, 'passwordLock').and.returnValue(initialPasswordLock);
    spyOn(initialPasswordLock, 'next');

    lockService.togglePasswordLock('28091998');

    expect(initialPasswordLock.next).toHaveBeenCalledWith('lock_open');
    expect(localStorage.getItem('enteredPassword')).toBe('28091998');
  });

  it('should reset all locks', () => {
    const initialSmallLocks = new BehaviorSubject<string[]>(['lock', 'lock', 'lock']);
    const initialBigLock = new BehaviorSubject<string>('lock');
    const initialHouseLocks = new BehaviorSubject<string[]>(['lock', 'lock', 'lock_open', 'lock', 'lock']);
    const initialPasswordLock = new BehaviorSubject<string>('lock');
    spyOnProperty(lockService as any, 'smallLocks').and.returnValue(initialSmallLocks);
    spyOn(initialSmallLocks, 'next');
    spyOnProperty(lockService as any, 'bigLock').and.returnValue(initialBigLock);
    spyOn(initialBigLock, 'next');
    spyOnProperty(lockService as any, 'houseLocks').and.returnValue(initialHouseLocks);
    spyOn(initialHouseLocks, 'next');
    spyOnProperty(lockService as any, 'passwordLock').and.returnValue(initialPasswordLock);
    spyOn(initialPasswordLock, 'next');
    spyOn(localStorage, 'setItem');

    lockService.resetAll();

    expect(initialSmallLocks.next).toHaveBeenCalledWith(['lock', 'lock', 'lock']);
    expect(initialBigLock.next).toHaveBeenCalledWith('lock');
    expect(initialHouseLocks.next).toHaveBeenCalledWith(['lock', 'lock', 'lock_open', 'lock', 'lock']);
    expect(initialPasswordLock.next).toHaveBeenCalledWith('lock');
    expect(localStorage.setItem).toHaveBeenCalledWith('smallLocks', JSON.stringify(['lock', 'lock', 'lock']));
    expect(localStorage.setItem).toHaveBeenCalledWith('bigLock', 'lock');
    expect(localStorage.setItem).toHaveBeenCalledWith('houseLocks', JSON.stringify(['lock', 'lock', 'lock_open', 'lock', 'lock']));
    expect(localStorage.setItem).toHaveBeenCalledWith('passwordLock', 'lock');
    expect(localStorage.setItem).toHaveBeenCalledWith('enteredPassword', '');
  });

  it('should reset front door locks', () => {
    const initialSmallLocks = new BehaviorSubject<string[]>(['lock', 'lock', 'lock']);
    const initialBigLock = new BehaviorSubject<string>('lock');
    spyOnProperty(lockService as any, 'smallLocks').and.returnValue(initialSmallLocks);
    spyOn(initialSmallLocks, 'next');
    spyOnProperty(lockService as any, 'bigLock').and.returnValue(initialBigLock);
    spyOn(initialBigLock, 'next');
    spyOn(localStorage, 'setItem');

    lockService.resetFrontDoor();

    expect(initialSmallLocks.next).toHaveBeenCalledWith(['lock', 'lock', 'lock']);
    expect(initialBigLock.next).toHaveBeenCalledWith('lock');
    expect(localStorage.setItem).toHaveBeenCalledWith('smallLocks', JSON.stringify(['lock', 'lock', 'lock']));
    expect(localStorage.setItem).toHaveBeenCalledWith('bigLock', 'lock');
  });

});
