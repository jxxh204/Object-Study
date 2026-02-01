import { Ticket } from './Ticket';

export class TicketOffice {
  private amount: number;
  private tickets: Ticket[];

  constructor(amount: number, tickets: Ticket[]) {
    this.amount = amount;
    this.tickets = [...tickets];
  }

  getTicket(): Ticket | undefined {
    return this.tickets.shift();
  }

  plusAmount(amount: number): void {
    this.amount += amount;
  }

  minusAmount(amount: number): void {
    this.amount -= amount;
  }

  getAmount(): number {
    return this.amount;
  }

  getTicketCount(): number {
    return this.tickets.length;
  }
}
