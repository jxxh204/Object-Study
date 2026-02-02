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
    const name = audience.getName();
    const ticket = this.ticketOffice.getTicket();

    if (ticket) {
      if (audience.getBag().hasInvitation()) {
        audience.getBag().setTicket(ticket);
        log.push(
          `<span class="chain">ticketSeller.sellTo(${name})</span> → 초대장 확인됨, 티켓을 가방에 넣음`,
        );
        log.push(
          `<strong>${name}</strong>이(가) 초대장으로 무료 입장했습니다.`,
        );
      } else {
        const fee = ticket.getFee();
        audience.getBag().minusAmount(fee);
        this.ticketOffice.plusAmount(fee);
        audience.getBag().setTicket(ticket);
        log.push(
          `<span class="chain">ticketSeller.sellTo(${name})</span> → ${fee.toLocaleString()}원 결제, 티켓을 가방에 넣음`,
        );
        log.push(
          `<strong>${name}</strong>이(가) ${fee.toLocaleString()}원을 지불하고 입장했습니다.`,
        );
      }
    }

    return log;
  }
}
