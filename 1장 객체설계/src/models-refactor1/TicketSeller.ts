import type { Audience } from "./Audience";
import { Ticket } from "./Ticket";
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
  sellTo(audience: Audience): string[] {
    const log: string[] = [];
    const ticket = this.ticketOffice.getTicket();

    if (ticket) {
      const ticket = this.ticketOffice.getTicket();
      this.ticketOffice.plusAmount(audience.buy(ticket));
    }

    return log;
  }
}
