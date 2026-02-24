import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  loggedInUser = null;

  users = [
    { name: 'Alice', userId: 123 },
    { name: 'Bob', userId: 456 },
    { name: 'Charlie', userId: 789 }
  ];
}
