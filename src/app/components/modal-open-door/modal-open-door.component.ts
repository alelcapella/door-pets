import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-modal-open-door',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  templateUrl: './modal-open-door.component.html',
  styleUrls: ['./modal-open-door.component.scss']
})
export class ModalOpenDoorComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalOpenDoorComponent>,
    private router: Router,
    private modalService: ModalService,
  ) { }

  goToNextPage(): void {
    if (this.data && this.data.buttonPath) {
      this.router.navigate([this.data.buttonPath]);
      this.dialogRef.close();
      this.modalService.resetModalState();

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      ).subscribe(() => {
        this.dialogRef.close();
        this.modalService.resetModalState();
      });
    } else {
      console.error('Erro ao redirecionar.');
      this.dialogRef.close();
      this.modalService.resetModalState();
    }
  }
}
