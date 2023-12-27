import { Component } from '@angular/core';
import { ModalService } from '../../services/modal-service';
import { LockService } from '../../services/lock-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cats-room',
  standalone: true,
  imports: [],
  templateUrl: './cats-room.component.html',
  styleUrl: './cats-room.component.scss'
})
export class CatsRoomComponent {

  constructor(
    private modalService: ModalService,
    private lockService: LockService,
    private router: Router,
  ) { }

  goBackHome() {
    this.router.navigate(['/']);
    this.modalService.resetModalState();
    this.lockService.resetAll();
  }
}
