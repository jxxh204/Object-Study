export class Ticket {
  private fee: number;

  constructor(fee: number) {
    this.fee = fee;
  }

  getFee(): number {
    return this.fee;
  }
}
