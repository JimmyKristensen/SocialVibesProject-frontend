
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSelectionService {
  private selectedUserId: string = '';

  setSelectedUserId(userId: string): void {
    this.selectedUserId = userId;
  }

  getSelectedUserId(): string {
    return this.selectedUserId;
  }
}
