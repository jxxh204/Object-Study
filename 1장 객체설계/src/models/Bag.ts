import { Invitation } from './Invitation';
import { Ticket } from './Ticket';

export class Bag {
  private amount: number;
  private invitation: Invitation | null;
  private ticket: Ticket | null = null;

  constructor(amount: number, invitation?: Invitation) {
    this.amount = amount;
    this.invitation = invitation ?? null;
  }

  hasInvitation(): boolean {
    return this.invitation !== null;
  }

  hasTicket(): boolean {
    return this.ticket !== null;
  }

  setTicket(ticket: Ticket): void {
    this.ticket = ticket;
  }

  minusAmount(amount: number): void {
    this.amount -= amount;
  }

  plusAmount(amount: number): void {
    this.amount += amount;
  }

  getAmount(): number {
    return this.amount;
  }

  getTicket(): Ticket | null {
    return this.ticket;
  }

  getInvitation(): Invitation | null {
    return this.invitation;
  }
}
