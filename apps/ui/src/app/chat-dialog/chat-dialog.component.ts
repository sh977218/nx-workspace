import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';

import { MaterialModule } from '../material.module';

@Component({
  imports: [MaterialModule, FormsModule],
  template: `
    <h2 matDialogTitle>Chat</h2>
    <mat-dialog-content>
      <ul class="flex flex-col gap-2 p-3 border-2 border-gray-300 rounded-lg">
        @for (message of messages(); track $index) {
          <li
            class="flex align-baseline odd:bg-white even:bg-gray-50 even:flex-row-reverse"
          >
            <mat-icon>person</mat-icon>
            {{ message }}
          </li>
        }
      </ul>
    </mat-dialog-content>
    <mat-dialog-actions>
      <mat-form-field class="w-full">
        <mat-label>Type Messages</mat-label>
        <textarea matInput [(ngModel)]="message"></textarea>
      </mat-form-field>
      <button matButton cdkFocusInitial (click)="sendMessage()">Send</button>
      <button matButton matDialogClose>Close</button>
    </mat-dialog-actions>
  `,
})
export class ChatDialogComponent implements OnInit {
  private socket: Socket;
  message = '';
  roomName = 'some room';
  messages = signal<string[]>([]);

  constructor() {
    this.socket = io('http://localhost:3000'); // Connect to Socket.IO server

    this.socket.on('connect', () => {
      this.socket.emit('joinRoom', {
        roomName: this.roomName,
        userId: 'user1',
      });
    });
  }

  ngOnInit(): void {
    this.socket.on('msgToClient', (data) => {
      this.messages.update((messages) => [...messages, data.message]);
    });
  }

  sendMessage(): void {
    this.socket.emit('sendMessageToRoom', {
      roomName: this.roomName,
      message: this.message,
      sender: 'user1',
    });
    this.message = '';
  }
}
