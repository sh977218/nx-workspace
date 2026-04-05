import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { io, Socket } from 'socket.io-client';

import { UserService } from '../services/user.service';

interface ChatMessage {
  sender: string;
  message: string;
}

@Component({
  imports: [MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  template: `
    <h2 matDialogTitle>Chat</h2>
    <mat-dialog-content>
      <ul
        class="flex flex-col gap-2 p-3 border-2 border-gray-300 rounded-lg h-full"
      >
        @for (chatMessage of chatMessages(); track $index) {
          <li
            class="flex align-baseline"
            [class]="{
              'bg-white': isMyself(chatMessage.sender),
              'bg-gray-50': !isMyself(chatMessage.sender),
              'flex-row-reverse': !isMyself(chatMessage.sender),
            }"
          >
            <mat-icon>person</mat-icon>
            {{ isMyself(chatMessage.sender) ? 'me' : chatMessage.sender }}:
            {{ chatMessage.message }}
          </li>
        }
      </ul>
    </mat-dialog-content>
    <mat-dialog-actions>
      <mat-form-field class="w-full">
        <mat-label>Type Messages</mat-label>
        <textarea matInput [(ngModel)]="message"></textarea>
      </mat-form-field>
      <button matButton (click)="sendMessage()">Send</button>
      <button matButton matDialogClose>Close</button>
    </mat-dialog-actions>
  `,
})
export class ChatDialogComponent {
  userService = inject(UserService);
  private socket: Socket;
  message = '';
  roomName = 'chat room';
  chatMessages = signal<ChatMessage[]>([]);

  isMyself = this.userService.isMyself;

  constructor() {
    this.socket = io('http://localhost:3000'); // Connect to Socket.IO server

    this.socket.on('connect', () => {
      this.socket.emit('joinRoom', {
        roomName: this.roomName,
        userId: this.userService.loggedInUser()?.name,
      });
    });

    this.socket.on('msgToClient', (data: ChatMessage) => {
      this.chatMessages.update((chatMessages) => [...chatMessages, data]);
    });
  }

  sendMessage(): void {
    this.socket.emit('sendMessageToRoom', {
      roomName: this.roomName,
      message: this.message,
      sender: this.userService.loggedInUser()?.username,
    });
    this.message = '';
  }
}
