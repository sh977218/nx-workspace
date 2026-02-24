import { Injectable, signal } from '@angular/core';
import { User } from '@shared-models/shared-models';

@Injectable({ providedIn: 'root' })
export class UserService {
  loggedInUser = signal<User | null>(null);

  users: User[] = [
    { name: 'Alice', userId: 123 },
    { name: 'Bob', userId: 456 },
    { name: 'Charlie', userId: 789 }
  ];

  isMyself(username: string) {
    return this.loggedInUser()?.name === username;
  }
}
