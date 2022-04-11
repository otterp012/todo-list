import { newCardWrapper, cardWrapper } from './component/card';
import { store, setStateProperty, getState } from './store/store';
import {
  getTargetParentByClassName,
  deleteNode,
  getTargetChild,
} from './utils/utils';

const modalWrapperEl = document.querySelector('.modal-wrapper');
const modalCancelBtnEl = document.querySelector('.modal-cancel-btn');

modalCancelBtnEl.addEventListener('click', () => {
  modalWrapperEl.classList.remove('active');
});

const modalRemoveBtnEl = document.querySelector('.modal-remove-btn');

modalRemoveBtnEl.addEventListener('click', () => {
  const removedCardId = getState('focusedCardID');
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

columnsWrapperEl.forEach((columnWrapper) => {
  columnWrapper.addEventListener('click', (e) => {
    if (e.target.className === 'column-add-btn') {
      e.target.classList.add('active');
      e.currentTarget.innerHTML += newCardWrapper({ id: 'focused' });
    }

    if (e.target.className === 'card-add-btn') {
      const focusedCard = document.querySelector('#focused');
      const data = [...focusedCard.children]
        .filter((v) => v.tagName === 'INPUT')
        .map((v) => v.value);

      const cardInforObj = {
        cardID: getState('nextCardID'),
        tittle: null,
        text: null,
      };

      [cardInforObj.tittle, cardInforObj.text] = data;
      document.querySelectorAll('.column-add-btn').forEach((v) => {
        if (v.classList.contains('active')) v.classList.remove('active');
      });
      e.currentTarget.innerHTML += cardWrapper(cardInforObj);
      setStateProperty('newInputCard', cardInforObj);
      deleteNode('#focused');
      const cardWrapperNum = [...e.currentTarget.children].filter(
        (v) => v.className === 'card-wrapper'
      ).length;
      getTargetChild(e.currentTarget, 'column-header-num').textContent =
        cardWrapperNum;
    }

    if (e.target.className === 'card-cancel-btn') {
      document.querySelectorAll('.column-add-btn').forEach((v) => {
        if (v.classList.contains('active')) v.classList.remove('active');
      });
      deleteNode('#focused');
    }

    if (e.target.className === 'card-remove-btn') {
      const cardNode = getTargetParentByClassName(e.target, 'card-wrapper');
      setStateProperty('focusedCardID', cardNode.id);
      modalWrapperEl.classList.add('active');
    }
  });
});

document.querySelector('.card-wrapper').addEventListener('dblclick', (e) => {
  const data = e.currentTarget.innerText
    .trim()
    .split('\n')
    .filter((v) => v.length);
  const focusedCardObj = {
    id: 'focused',
    tittle: null,
    text: null,
  };
  const currentCardObj = {
    id: e.currentTarget.id,
    tittle: null,
    text: null,
  };

  [focusedCardObj.tittle, focusedCardObj.text] = data;
  document.querySelector('#B').parentNode.innerHTML +=
    newCardWrapper(focusedCardObj);
});
