import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class LockService {
    private smallLocks: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    private bigLock: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private houseLocks: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    private passwordLock: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.initializeLocalStorage();
    }

    private initializeLocalStorage(): void {
        try {
          if (isPlatformBrowser(this.platformId)) {
            const savedSmallLocks = JSON.parse(localStorage.getItem('smallLocks') ?? '["lock", "lock", "lock"]');
            const savedBigLock = localStorage.getItem('bigLock') ?? 'lock';
            const savedHouseLocks = JSON.parse(localStorage.getItem('houseLocks') ?? '["lock", "lock", "lock_open", "lock", "lock"]');
            const savedPasswordLock = localStorage.getItem('passwordLock') ?? 'lock';
    
            this.smallLocks = new BehaviorSubject(savedSmallLocks);
            this.bigLock = new BehaviorSubject(savedBigLock);
            this.houseLocks = new BehaviorSubject(savedHouseLocks);
            this.passwordLock = new BehaviorSubject(savedPasswordLock)
    
            this.smallLocks.subscribe(locks => localStorage.setItem('smallLocks', JSON.stringify(locks)));
            this.bigLock.subscribe(icon => localStorage.setItem('bigLock', icon));
            this.houseLocks.subscribe(locks2 => localStorage.setItem('houseLocks', JSON.stringify(locks2)));
            this.passwordLock.subscribe(icon2 => localStorage.setItem('passwordLock', icon2));
          } else {
            console.warn('localStorage indisponível.');
          }
        } catch (error) {
          console.error('Erro localStorage:', error);
        }
      }


    getSmallLocks(): Observable<string[]> {
        return this.smallLocks.asObservable();
    }

    getBigLock(): Observable<string> {
        return this.bigLock.asObservable();
    }

    gethouseLocks(): Observable<string[]> {
        return this.houseLocks.asObservable();
    }

    getPasswordLock(): Observable<string> {
        return this.passwordLock.asObservable();
    }

    toggleSmallLock(index: number): void {
        const currentLocks = this.smallLocks.value;
        currentLocks[index] = (currentLocks[index] === 'lock') ? 'lock_open' : 'lock';

        this.smallLocks.next([...currentLocks]);

        const allLocksOpen = currentLocks.every(icon => icon === 'lock_open');

        this.bigLock.next(allLocksOpen ? 'lock_open' : 'lock');
    }

    toggleHouseLock(index: number): void {
        const currentLocks = this.houseLocks.value;

        if (index === 2 && currentLocks[index] === 'lock_open') {
            currentLocks[index] = 'lock';
        } else {
            currentLocks[index] = (currentLocks[index] === 'lock') ? 'lock_open' : 'lock';
        }

        this.houseLocks.next([...currentLocks]);
    }

    togglePasswordLock(password: string): void {
        const correctPassword = '28091998';

        if (password === correctPassword) {
            this.passwordLock.next('lock_open');
        } else {
            this.passwordLock.next('lock');
        }
        localStorage.setItem('enteredPassword', password);
    }

    resetAll(): void {
        const initialSmallLocks = ["lock", "lock", "lock"];
        const initialBigLock = 'lock';
        const initialHouseLocks = ["lock", "lock", "lock_open", "lock", "lock"];
        const initialPasswordLock = 'lock';

        this.smallLocks.next([...initialSmallLocks]);
        this.bigLock.next(initialBigLock);
        this.houseLocks.next([...initialHouseLocks]);
        this.passwordLock.next(initialPasswordLock);

        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('smallLocks', JSON.stringify(initialSmallLocks));
            localStorage.setItem('bigLock', initialBigLock);
            localStorage.setItem('houseLocks', JSON.stringify(initialHouseLocks));
            localStorage.setItem('passwordLock', initialPasswordLock);
            localStorage.setItem('enteredPassword', '');
        }
    }

    resetFrontDoor(): void {
        const initialSmallLocks = ["lock", "lock", "lock"];
        const initialBigLock = 'lock';

        this.smallLocks.next([...initialSmallLocks]);
        this.bigLock.next(initialBigLock);

        localStorage.setItem('smallLocks', JSON.stringify(initialSmallLocks));
        localStorage.setItem('bigLock', initialBigLock);
    }
}

