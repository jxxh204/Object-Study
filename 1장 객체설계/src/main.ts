import { Invitation } from './models/Invitation';
import { Ticket } from './models/Ticket';
import { Bag } from './models/Bag';
import { Audience } from './models/Audience';
import { TicketOffice } from './models/TicketOffice';
import { TicketSeller } from './models/TicketSeller';
import { Theater } from './models/Theater';
import {
  renderTicketOffice,
  renderAudienceList,
  appendLog,
} from './ui/renderer';
import './style.css';

const TICKET_FEE = 10_000;

function createInitialState() {
  const tickets = Array.from({ length: 5 }, () => new Ticket(TICKET_FEE));
  const ticketOffice = new TicketOffice(0, tickets);
  const ticketSeller = new TicketSeller(ticketOffice);
  const theater = new Theater(ticketSeller);

  const audiences: Audience[] = [
    new Audience('민수', new Bag(30_000, new Invitation(new Date()))),
    new Audience('지영', new Bag(50_000)),
    new Audience('철수', new Bag(20_000, new Invitation(new Date()))),
    new Audience('영희', new Bag(40_000)),
    new Audience('준호', new Bag(10_000)),
  ];

  return { theater, audiences, ticketOffice };
}

let state = createInitialState();
let currentIndex = 0;

const ticketOfficeContainer = document.getElementById('ticket-office-state')!;
const audienceContainer = document.getElementById('audience-list')!;
const logContainer = document.getElementById('action-log')!;
const enterBtn = document.getElementById('enter-btn') as HTMLButtonElement;
const resetBtn = document.getElementById('reset-btn')!;

function render() {
  renderTicketOffice(state.ticketOffice, ticketOfficeContainer);
  renderAudienceList(state.audiences, currentIndex, audienceContainer);
  enterBtn.disabled = currentIndex >= state.audiences.length;
}

render();

enterBtn.addEventListener('click', () => {
  if (currentIndex >= state.audiences.length) return;

  const audience = state.audiences[currentIndex];
  const log = state.theater.enter(audience);
  appendLog(log, logContainer, audience.getName());
  currentIndex++;
  render();

  if (currentIndex >= state.audiences.length) {
    const complete = document.createElement('div');
    complete.className = 'log-complete';
    complete.textContent = '모든 관객이 입장했습니다.';
    logContainer.appendChild(complete);
  }
});

resetBtn.addEventListener('click', () => {
  state = createInitialState();
  currentIndex = 0;
  logContainer.innerHTML = '';
  render();
});
