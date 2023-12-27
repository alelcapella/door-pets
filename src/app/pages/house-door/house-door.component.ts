import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LockService } from '../../services/lock-service';
import { MatDialog } from '@angular/material/dialog';
import { ModalOpenDoorComponent } from '../../components/modal-open-door/modal-open-door.component';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-house-door',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './house-door.component.html',
  styleUrls: ['./house-door.component.scss']
})
export class HouseDoorComponent implements OnInit {
  houseIcon: string[] = [];
  dialogRef: any;

  constructor(
    private lockService: LockService,
    public dialog: MatDialog,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.lockService.gethouseLocks().subscribe(locks2 => {
      this.houseIcon = locks2;

      const isAllLocksOpenExceptCentral = locks2.every((lock, index) => (index !== 2 && lock === 'lock_open') || (index === 2 && lock === 'lock'));

      if (isAllLocksOpenExceptCentral) {
        this.openDialog('3000ms', '1500ms');
      } else {
        this.closeDialog();
      }
    });
    this.modalService.onModalStateChanged().subscribe(() => {
      this.closeDialog();
    });
  }

  toggleLockHouse(index: number): void {
    this.lockService.toggleHouseLock(index);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.modalService.openModal();
    this.dialogRef = this.dialog.open(ModalOpenDoorComponent, {
      width: '500px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        dialogText: 'A porta da casa abriu, clique no botão para ir para a próxima porta.',
        buttonPath: '/pets-door',
        buttonText: 'Próxima Porta'
      }
    });

    this.dialogRef.afterClosed().subscribe((result: string) => {
      this.modalService.resetModalState();
    });
  }

  closeDialog(): void {
    if (this.dialogRef && this.dialogRef.componentInstance) {
      this.dialogRef.close();
      this.modalService.resetModalState();
    }
  }
}
