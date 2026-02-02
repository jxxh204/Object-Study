import { Audience } from "./Audience";
import { TicketSeller } from "./TicketSeller";

export class Theater {
  private ticketSeller: TicketSeller;

  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  /**
   * "개선된 설계" - Theater는 TicketSeller에게 판매를 위임한다.
   * Theater는 더 이상 audience의 가방이나 매표소의 내부를 직접 조작하지 않는다.
   */
  enter(audience: Audience): string[] {
    return this.ticketSeller.sellTo(audience);
  }

  getTicketSeller(): TicketSeller {
    return this.ticketSeller;
  }
}
