import { newCardWrapper, cardWrapper } from './component/card';
import { store, setStateProperty, getState } from './store/store';
import { getTargetParentByClassName, deleteNode } from './utils/utils';
const cardRemoveBtnEl = document.querySelector('.card-remove-btn');
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
});

const columnWrapperEl = document.querySelector('.column-wrapper');

columnWrapperEl.addEventListener('click', (e) => {
  if (e.target.className === 'column-add-btn') {
    columnWrapperEl.innerHTML += newCardWrapper('focused');
    document.querySelector('.column-add-btn').classList.add('active');
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
    columnWrapperEl.innerHTML += cardWrapper(cardInforObj);
    setStateProperty('newInputCard', cardInforObj);
    deleteNode('#focused');
    document.querySelector('.column-add-btn').classList.remove('active');
  }

  if (e.target.className === 'card-cancel-btn') {
    document.querySelector('.column-add-btn').classList.remove('active');
    deleteNode('#focused');
  }

  if (e.target.className === 'card-remove-btn') {
    const cardNode = getTargetParentByClassName(e.target, 'card-wrapper');
    setStateProperty('focusedCardID', cardNode.id);
    modalWrapperEl.classList.add('active');
  }
});
