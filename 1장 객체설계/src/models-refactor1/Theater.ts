import { Audience } from "./Audience";
import { TicketSeller } from "./TicketSeller";

export class Theater {
  private ticketSeller: TicketSeller;

  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  /**
   * "나쁜 설계" - Theater가 모든 객체의 내부를 직접 조작한다.
   * audience의 가방을 열어 초대장을 확인하고, 매표소에서 티켓을 꺼내고,
   * 돈을 이동시키는 모든 과정을 Theater가 직접 수행한다.
   */
  enter(audience: Audience): string[] {
    const log: string[] = [];
    const name = audience.getName();

    if (audience.getBag().hasInvitation()) {
      log.push(
        `<span class="chain">audience.getBag().hasInvitation()</span> → 초대장 확인됨`,
      );

      const ticket = this.ticketSeller.getTicket();
      log.push(
        `<span class="chain">ticketSeller.getTicketOffice().getTicket()</span> → 티켓 꺼냄`,
      );

      if (ticket) {
        audience.getBag().setTicket(ticket);
        log.push(
          `<span class="chain">audience.getBag().setTicket(ticket)</span> → 티켓을 가방에 넣음`,
        );
        log.push(
          `<strong>${name}</strong>이(가) 초대장으로 무료 입장했습니다.`,
        );
      }
    } else {
      log.push(
        `<span class="chain">audience.getBag().hasInvitation()</span> → 초대장 없음`,
      );

      const ticket = this.ticketSeller.getTicket();
      log.push(
        `<span class="chain">ticketSeller.getTicketOffice().getTicket()</span> → 티켓 꺼냄`,
      );

      if (ticket) {
        const fee = ticket.getFee();

        audience.getBag().minusAmount(fee);
        log.push(
          `<span class="chain">audience.getBag().minusAmount(${fee})</span> → 관객 가방에서 ${fee.toLocaleString()}원 차감`,
        );

        this.ticketSeller.plusAmount(fee);
        log.push(
          `<span class="chain">ticketSeller.getTicketOffice().plusAmount(${fee})</span> → 매표소에 ${fee.toLocaleString()}원 추가`,
        );

        audience.getBag().setTicket(ticket);
        log.push(
          `<span class="chain">audience.getBag().setTicket(ticket)</span> → 티켓을 가방에 넣음`,
        );

        log.push(
          `<strong>${name}</strong>이(가) ${fee.toLocaleString()}원을 지불하고 입장했습니다.`,
        );
      }
    }

    return log;
  }

  getTicketSeller(): TicketSeller {
    return this.ticketSeller;
  }
}
