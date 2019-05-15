export enum Status {
  ALRIGHT,
  NOT_ALRIGHT
}

export class ItskoResponse {
  private message: string;
  private status: Status;

  constructor(message: string, status: Status) {
    this.message = message;
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  getMessage() {
    return this.message;
  }
}
