## 패러다임의 유래.

- 모델, 패턴 또는 전형적인 예를 의미하는 그리스어 파라데이그마(paradeigma)에서 유래.
- 예를 들면 동사의 활용으로 그는/그녀는/그것은 사랑한다.는 라틴어로 각각 amo,amas,amat으로 표현한다.

현대의 패러다임은 '한 시대의 사회 전체가 공유하는 이론이나 방법, 체계'를 의미한다. 왜 바뀌게 된걸까?

- 1962년 토마스 쿤의 "과학형명의 구조" 책 출간으로 시작.
- 과학의 발전이란?
  before : 이미 달성한 과학적 성취를 누적하며 진보
  after : 과학은 단순한 계단식이 아닌 기존의 견해를 붕괴시키는 혁명적 과정에서 발전 주장.

과학혁명이란 과거의 패러다임이 새로운 패러다임에 의해 대체됨으로써 정상과학의 방향과 성격이 변하는 것을 의미. 이를 패러다임 전환이라고 부른다.
하나의 예시로 천동설 => 지동설 도 있다.

### 프로그래밍 패러다임

- 패러다임이라는 용어의 선택의 장점은. 법칙, 이론, 응용, 도구의 조작 등 모두를 포함한 실제로 인정된 실례들, 정통 모델을 사용한다는 것을 의미.
- 공유된 패러다임에 근거하여 동일한 규칙과 표준에 헌신
- 즉 불필요한 의견 충돌을 방지한다.

- 프로그래밍에서는 절차형, 객체지향 두 패러다임이 함께 공존할 수 있다. 서로의 장단점을 보완하는 경향이 있고 대표적으로 두 패러다임을 접목시킨 스칼라가 있다.

- 오브젝트의 저자는 프로그래밍 패러다임은 과학과 달리 혁명적이기보다 발전적이라고 말한다. 그래서 여러 패러다임을 알고 넓은 시야를 가져야한다.

## 티켓 판매 애플리케이션 구현하기

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
