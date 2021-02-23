/* eslint-disable no-use-before-define */
/* eslint-disable spaced-comment */
import { lottoData } from '../model/lottoData.js';
import $ from '../lib/utils/dom.js';

///////// 구입 금액
const TICKET_PRICE = 1000;

const lottoPurchaseHandler = event => {
  event.preventDefault();
  const paymentInput = event.target.elements['payment-input'].value;

  if (Number(paymentInput) < 1000) {
    alert(
      '1000원 미만의 금액은 입력할 수 없습니다. 1000원 이상의 금액을 입력해 주세요.'
    );
    return;
  }

  lottoData.ticketAmount = Math.floor(Number(paymentInput) / TICKET_PRICE);
  lottoData.tickets = [...Array(lottoData.ticketAmount)].map(() =>
    getTicketNumber()
  );

  const ticketsHTML = lottoData.tickets
    .map(ticketNumber => createTicktHTML(ticketNumber))
    .join('');

  $('#ticket-list').innerHTML = ticketsHTML;
  $(
    '#ticket-count'
  ).innerHTML = `총 ${lottoData.ticketAmount}개를 구매하였습니다.`;
  $('#toggle-detail-mode').classList.remove('hide');
};

function createTicktHTML(ticketNumber) {
  return `<div>
            <span class="mx-1 text-4xl">🎟️ </span>
            <span class="ticket-number hide">${ticketNumber.join(', ')}</span>
          </div>`;
}

function getTicketNumber() {
  const ticketNumber = new Set();

  while (ticketNumber.size < 6) {
    ticketNumber.add(getRandomNumber(1, 45));
  }

  return [...ticketNumber];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default lottoPurchaseHandler;
