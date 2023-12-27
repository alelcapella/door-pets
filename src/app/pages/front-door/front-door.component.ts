import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LockService } from '../../services/lock-service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalOpenDoorComponent } from '../../components/modal-open-door/modal-open-door.component';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-front-door',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './front-door.component.html',
  styleUrls: ['./front-door.component.scss']
})
export class FrontDoorComponent implements OnInit {

  icons: string[] = [];
  bigLockIcon: string = '';
  dialogRef: any;

  constructor(private lockService: LockService, public dialog: MatDialog, public modalService: ModalService) { }

  ngOnInit(): void {
    this.lockService.getSmallLocks().subscribe(locks => this.icons = locks);
    this.lockService.getBigLock().subscribe(icon => {
      this.bigLockIcon = icon;
      if (icon === 'lock_open') {
        this.openDialog('3000ms', '1500ms');
      } else {
        this.closeDialog();
      }
    });
    this.modalService.onModalStateChanged().subscribe(() => {
      this.closeDialog();
    });
  }

  toggleLock(index: number): void {
    this.lockService.toggleSmallLock(index);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.modalService.openModal();
    this.dialogRef = this.dialog.open(ModalOpenDoorComponent, {
      width: '500px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        dialogText: 'A porta de entrada abriu, clique no botão para ir para a próxima porta.',
        buttonPath: '/house-door',
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
