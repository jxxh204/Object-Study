import { TicketOffice } from '../models/TicketOffice';
import { Audience } from '../models/Audience';

export function renderTicketOffice(
  office: TicketOffice,
  container: HTMLElement
): void {
  container.innerHTML = `
    <div class="info-row">
      <span class="label">잔액</span>
      <span class="value" id="office-amount">${office.getAmount().toLocaleString()}원</span>
    </div>
    <div class="info-row">
      <span class="label">남은 티켓</span>
      <span class="value" id="office-tickets">${office.getTicketCount()}장</span>
    </div>
  `;
}

export function renderAudienceList(
  audiences: Audience[],
  currentIndex: number,
  container: HTMLElement
): void {
  container.innerHTML = audiences
    .map((audience, i) => {
      const bag = audience.getBag();
      const isDone = i < currentIndex;
      const isCurrent = i === currentIndex;
      const hasInvitation = bag.hasInvitation();
      const hasTicket = bag.hasTicket();

      let statusClass = '';
      if (isDone) statusClass = 'done';
      else if (isCurrent) statusClass = 'current';

      return `
        <div class="audience-card ${statusClass}">
          <div class="audience-header">
            <span class="audience-name">${audience.getName()}</span>
            ${hasInvitation ? '<span class="badge badge-invitation">초대장</span>' : '<span class="badge badge-paying">일반</span>'}
            ${isCurrent ? '<span class="badge badge-current">다음</span>' : ''}
          </div>
          <div class="audience-details">
            <div class="info-row">
              <span class="label">소지금</span>
              <span class="value">${bag.getAmount().toLocaleString()}원</span>
            </div>
            <div class="info-row">
              <span class="label">티켓</span>
              <span class="value">${hasTicket ? '보유' : '없음'}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

export function appendLog(
  entries: string[],
  container: HTMLElement,
  audienceName?: string
): void {
  const group = document.createElement('div');
  group.className = 'log-group';

  if (audienceName) {
    const header = document.createElement('div');
    header.className = 'log-header';
    header.textContent = `── ${audienceName} 입장 처리 ──`;
    group.appendChild(header);
  }

  entries.forEach((entry) => {
    const div = document.createElement('div');
    div.className = 'log-entry';
    div.innerHTML = entry;
    group.appendChild(div);
  });

  container.appendChild(group);
  container.scrollTop = container.scrollHeight;
}
