import Component from '../lib/core/Component.js';
import { $, $$ } from '../lib/utils/dom.js';

class TicketList extends Component {
  mountTemplate() {
    const tickets = this.props.tickets.get();

    this.$target.innerHTML = `
      <div class="d-flex">
        <label class="flex-auto my-0">
          총 ${tickets.length}개를 구매하였습니다.
        </label>
        <div class="flex-auto d-flex justify-end pr-1">
          ${tickets.length ? this.createDetailModeToggleTemplate() : ''}
        </div>
      </div>
      <div id="ticket-list" class="d-flex flex-wrap">
        ${tickets.reduce(
          (acc, ticket) => acc + this.createTicketTemplate(ticket),
          ''
        )}
      </div>
    `;
  }

  createDetailModeToggleTemplate() {
    return `
        <label class="switch">
          <input id="detail-mode-toggle" type="checkbox" class="lotto-numbers-toggle-button" />
          <span class="text-base font-normal">번호보기</span>
        </label>
      `;
  }

  createTicketTemplate(ticket) {
    return `
      <div class="align-center">
        <span class="ticket mx-1 text-4xl">🎟️</span>
        <span class="lotto-numbers hide">${ticket.join(', ')}</span>
      </div>
    `;
  }

  subscribeStates() {
    this.props.tickets.subscribe(this.mountTemplate.bind(this));
  }

  initEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      if (target.id !== 'detail-mode-toggle') return;

      this.toggleDetailMode(target.checked);
    });
  }

  toggleDetailMode(isChecked) {
    if (isChecked) {
      this.turnDetailModeOn();
    } else {
      this.turnDetailModeOff();
    }
  }

  turnDetailModeOn() {
    $('#ticket-list').classList.add('flex-col', 'detail-mode');
  }

  turnDetailModeOff() {
    $('#ticket-list').classList.remove('flex-col', 'detail-mode');
  }
}

export default TicketList;
