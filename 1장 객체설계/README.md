패러다임의 유래.

- 모델, 패턴 또는 전형적인 예를 의미하는 그리스어 파라데이그마(paradeigma)에서 유래.
- 예를 들면 동사의 활용으로 그는/그녀는/그것은 사랑한다.는 라틴어로 각각 amo,amas,amat으로 표현한다.

현대의 패러다임은 '한 시대의 사회 전체가 공유하는 이론이나 방법, 체계'를 의미한다. 왜 바뀌게 된걸까?

티켓 판매 애플리케이션 구현하기

초기 설계의 문제점.
1장 객체설계/src/models/Theater.ts은 소극장을 구현한 것이다. 설명은 코드 밑에서 진행하겠다.

```
enter(audience: Audience): string[] {
    const log: string[] = [];
    const name = audience.getName();

    if (audience.getBag().hasInvitation()) {
      log.push(
        `<span class="chain">audience.getBag().hasInvitation()</span> → 초대장 확인됨`,
      );

      const ticket = this.ticketSeller.getTicketOffice().getTicket();
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

      const ticket = this.ticketSeller.getTicketOffice().getTicket();
      log.push(
        `<span class="chain">ticketSeller.getTicketOffice().getTicket()</span> → 티켓 꺼냄`,
      );

      if (ticket) {
        const fee = ticket.getFee();

        audience.getBag().minusAmount(fee);
        log.push(
          `<span class="chain">audience.getBag().minusAmount(${fee})</span> → 관객 가방에서 ${fee.toLocaleString()}원 차감`,
        );

        this.ticketSeller.getTicketOffice().plusAmount(fee);
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
```

### 뭐가 이상할까?

로버트 마틴은
