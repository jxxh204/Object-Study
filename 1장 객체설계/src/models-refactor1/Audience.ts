import { Bag } from "./Bag";
import type { Ticket } from "./Ticket";

export class Audience {
  private bag: Bag;
  private name: string;

  constructor(name: string, bag: Bag) {
    this.name = name;
    this.bag = bag;
  }

  getBag(): Bag {
    return this.bag;
  }

  getName(): string {
    return this.name;
  }
  buy(ticket: Ticket | undefined) {
    const log: string[] = [];
    if (!ticket) return 0;
    if (this.bag.hasInvitation()) {
      // 1. 가방에 티켓이 있는지 스스로 확인
      this.bag.setTicket(ticket);
      log.push(
        `<span class="chain">ticketSeller.sellTo(${name})</span> → 초대장 확인됨, 티켓을 가방에 넣음`,
      );
      return 0;
    } else {
      const fee = ticket.getFee();
      this.bag.setTicket(ticket); //티켓 받고
      this.bag.minusAmount(fee); // 지불하고
      log.push(
        `<span class="chain">ticketSeller.sellTo(${name})</span> → ${fee.toLocaleString()}원 결제, 티켓을 가방에 넣음`,
      );
      log.push(
        `<strong>${name}</strong>이(가) ${fee.toLocaleString()}원을 지불하고 입장했습니다.`,
      );
      return ticket.getFee();
    }
  }

  // 2. 티켓 꺼냄
  // 3. 티켓없으면 돈꺼냄.
}
