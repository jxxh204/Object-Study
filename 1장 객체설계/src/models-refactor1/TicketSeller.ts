import type { Ticket } from "./Ticket";
import { TicketOffice } from "./TicketOffice";

export class TicketSeller {
  private ticketOffice: TicketOffice;

  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  getTicketOffice(): TicketOffice {
    return this.ticketOffice;
  }
  getTicket(): Ticket | undefined {
    return this.ticketOffice.getTicket();
  }
  plusAmount(amount: number): void {
    return this.ticketOffice.plusAmount(amount);
  }
}
