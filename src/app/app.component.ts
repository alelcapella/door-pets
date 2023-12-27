import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LockService } from './services/lock-service';
import { PermissionsService } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [LockService, PermissionsService]
})
export class AppComponent {
  title = 'door-pets';
}
