import { newCardWrapper, cardWrapper } from './component/card';
import { store, setStateProperty, getState } from './store/store';
import { deleteNode, getTargetChild } from './utils/utils';

const modalWrapperEl = document.querySelector('.modal-wrapper');
const modalCancelBtnEl = document.querySelector('.modal-cancel-btn');

modalCancelBtnEl.addEventListener('click', () => {
  modalWrapperEl.classList.remove('active');
});

const modalRemoveBtnEl = document.querySelector('.modal-remove-btn');

modalRemoveBtnEl.addEventListener('click', () => {
  const removedCardId = getState('focusedCardID');
  const removedData = getTargetChild(
    document.querySelector(`#${removedCardId}`),
    'card-text'
  ).textContent;

  document.querySelector('.log-wrapper').innerHTML += log(
    removedData,
    'remove'
  );

  document.querySelector(`#${removedCardId}`).remove();
  modalWrapperEl.classList.remove('active');
  setStateProperty('focusedCardID', null);
  // const cardWrapperNum = [...e.currentTarget.children].filter(
  //   (v) => v.className === 'card-wrapper'
  // ).length;
  // console.log(cardWrapperNum);
  // classSelector(e.currentTarget, 'column-header-num').textContent =
  //   cardWrapperNum;
});

const columnsWrapperEl = document.querySelectorAll('.column-wrapper');
const updateColumnNum = (parent, target) => {
  return [...parent.children]
    .map((v) => v.className)
    .filter((v) => v === target);
};
const addClsssName = (node, className) => {
  node.classList.add(className);
};

const columnAddBtnClickEventHandler = (e) => {
  if (e.target.className === 'column-add-btn') {
    addClsssName(e.target, 'active');
    e.currentTarget.innerHTML += newCardWrapper({ id: 'newCardInput' });
  }
};

const obj = {
  tittle: null,
  text: null,
};

columnsWrapperEl.forEach((columnWrapper) => {
  columnWrapper.addEventListener('click', (e) => {
    if (e.target.className === 'column-add-btn') {
      addClsssName(e.target, 'active');
      e.currentTarget.innerHTML += newCardWrapper({ id: 'newCardInput' });
    }

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
      check();
    }

    if (e.target.className === 'card-cancel-btn') {
      document.querySelectorAll('.column-add-btn').forEach((v) => {
        if (v.classList.contains('active')) v.classList.remove('active');
      });
      deleteNode('#focused');
    }

    if (e.target.className === 'card-remove-btn') {
      const cardNode = e.target.closest('.card-wrapper');
      setStateProperty('focusedCardID', cardNode.id);
      modalWrapperEl.classList.add('active');
    }
  });
});

document.querySelector('.chat-menu-btn').addEventListener('click', () => {
  document.querySelector('.log-wrapper').classList.toggle('hidden');
});

const log = (text, attrubute) => {
  const attrubutes = {
    add: `${text}를 새로 입력했습니다`,
    remove: `${text}를 삭제했습니다.`,
  };
  return ` <div class="log-card-wrapper">
  <div class="log-image-wrapper">🥳</div>
  <div class="log-text-wrapper">
    <span class="user-name">@sam</span>
    <p class="log-text">${attrubutes[attrubute]}</p>
    <span class="time">1분 전</span>
  </div>
</div>
  `;
};

const check = () => {
  if (document.querySelectorAll('.log-card-wrapper').length > 6) {
    document.querySelectorAll('.log-card-wrapper')[0].remove();
  }
};

document.querySelector('.card-wrapper').addEventListener('dblclick', (e) => {
  const originCardWrapper = e.currentTarget;
  const nextCardWrapper = e.currentTarget.nextSibling;
  console.log(1);
});
