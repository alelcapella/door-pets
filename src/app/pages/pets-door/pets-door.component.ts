import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LockService } from '../../services/lock-service';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../services/modal-service';
import { ModalOpenDoorComponent } from '../../components/modal-open-door/modal-open-door.component';

@Component({
  selector: 'app-pets-door',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './pets-door.component.html',
  styleUrls: ['./pets-door.component.scss']
})
export class PetsDoorComponent {
  passwordIcon: string = '';
  dialogRef: any;
  enteredPassword: string = '';

  constructor(private lockService: LockService, public dialog: MatDialog, private modalService: ModalService) { }

  ngOnInit(): void {
    this.lockService.getPasswordLock().subscribe(icon2 => {
      this.passwordIcon = icon2;
      if (icon2 === 'lock_open') {
        this.openDialog('3000ms', '1500ms');
      } else {
        this.closeDialog();
      }
    });
    this.modalService.onModalStateChanged().subscribe(() => {
      this.closeDialog();
    });
  }

  handleKeypadButtonClick(value: string): void {
    this.enteredPassword += value;
    this.lockService.togglePasswordLock(this.enteredPassword);
  }

  resetPassword(): void {
    this.enteredPassword = '';
    this.lockService.togglePasswordLock(this.enteredPassword);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.modalService.openModal();
    this.dialogRef = this.dialog.open(ModalOpenDoorComponent, {
      width: '500px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        dialogText: 'A porta abriu, hora de alimentar seus gatinhos',
        buttonPath: '/cats-room',
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
