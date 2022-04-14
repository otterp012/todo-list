import { log } from '../component/log.js';
import { newCardWrapper, cardWrapper } from './component/card';
import { deleteNode, getTargetChild, addClsssName } from './utils/utils';

const columnAddBtnClickEventHandler = (e) => {
  if (e.target.className === 'column-add-btn') {
    addClsssName(e.target, 'active');
    e.currentTarget.innerHTML += newCardWrapper({ id: 'newCardInput' });
  }
};

const cardAddBtnClickEventHandler = (e) => {
  if (e.target.className === 'card-add-btn') {
    const newCardInfor = {
      tittle: null,
      text: null,
      columnID: null,
    };
    const newCardInputEl = document.querySelector('#newCardInput');
    const newInputData = [...newCardInputEl.children]
      .filter((v) => v.tagName === 'INPUT')
      .map((v) => v.value);
    newCardInfor.tittle = newInputData[0];
    newCardInfor.text = newInputData[1];
    newCardInfor.columnID = e.currentTarget.id;

    document.querySelectorAll('.column-add-btn').forEach((v) => {
      if (v.classList.contains('active')) v.classList.remove('active');
    });
    e.currentTarget.innerHTML += cardWrapper(newCardInfor);
    deleteNode('#newCardInput');

    const cardWrapperNum = [...e.currentTarget.children].filter(
      (v) => v.className === 'card-wrapper'
    ).length;
    getTargetChild(e.currentTarget, 'column-header-num').textContent =
      cardWrapperNum;

    // add log
    document.querySelector('.log-wrapper').innerHTML += log(
      newCardInfor.text,
      'add'
    );
    checkLogCount();
  }
};

const cardCancelBtnClickEventHandler = (e) => {
  if (e.target.className === 'card-cancel-btn') {
    document.querySelectorAll('.column-add-btn').forEach((v) => {
      if (v.classList.contains('active')) v.classList.remove('active');
    });
    deleteNode('#newCardInput');
  }
};

const cardRemoveClickEventHandler = (e) => {
  if (e.target.className === 'card-remove-btn') {
    const cardNode = e.target.closest('.card-wrapper');
    const modalWrapperEl = document.querySelector('modal-wrapper');
    cardNode.classList.add('focused');
    modalWrapperEl.classList.add('active');
  }
};

const checkLogCount = () => {
  if (document.querySelectorAll('.log-card-wrapper').length > 6) {
    document.querySelectorAll('.log-card-wrapper')[0].remove();
  }
};

const columnEvent = () => {
  const columnsWrapperEl = document.querySelectorAll('.column-wrapper');
  columnsWrapperEl.forEach((columnWrapper) => {
    columnWrapper.addEventListener('click', (e) => {
      columnAddBtnClickEventHandler(e);
      cardAddBtnClickEventHandler(e);
      cardCancelBtnClickEventHandler(e);
      cardRemoveClickEventHandler(e);
    });
  });
};

const logBtnClickEvent = () => {
  document.querySelector('.chat-menu-btn').addEventListener('click', () => {
    document.querySelector('.log-wrapper').classList.toggle('hidden');
  });
};

export { columnEvent };
