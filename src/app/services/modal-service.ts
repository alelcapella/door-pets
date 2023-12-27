import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStateChanged = new EventEmitter<void>();
  private modalStateKey = 'modalState';
  public modalState: boolean;

  constructor() {
    this.modalState = this.loadModalStateFromLocalStorage();
  }

  public loadModalStateFromLocalStorage(): boolean {
    if (typeof localStorage !== 'undefined') {
      try {
        const storedState = localStorage.getItem(this.modalStateKey);
        return storedState ? JSON.parse(storedState) : false;
      } catch (error) {
        console.error('Erro localStorage:', error);
      }
    } else {
      console.warn('localStorage indisponível.');
    }

    return false;
  }

  public saveModalStateToLocalStorage(state: boolean): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.modalStateKey, JSON.stringify(state));
      } catch (error) {
        console.error('Erro localStorage:', error);
      }
    } else {
      console.warn('localStorage indisponível.');
    }
  }

  onModalStateChanged(): EventEmitter<void> {
    return this.modalStateChanged;
  }

  openModal(): void {
    this.modalState = true;
    this.saveModalStateToLocalStorage(this.modalState);
    this.modalStateChanged.emit();
  }

  resetModalState(): void {
    this.modalState = false;
    this.saveModalStateToLocalStorage(this.modalState);
  }
}
