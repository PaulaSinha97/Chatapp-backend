import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private userId: string;
  setUser(userId: string) {
    console.log('request service set user', userId);
    this.userId = userId;
  }

  getUserId() {
    console.log('request service get user', this.userId);
    return this.userId;
  }
}
