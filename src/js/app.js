const store = {
  focusedCardID: null,
  newInputCard: {
    cardID: null,
    tittle: null,
    text: null,
  },
  nextCardID: 'A',
};

Object.defineProperty(store, 'newInputCard', {
  get() {
    return this._newInputCard;
  },

  set(obj) {
    this._newInputCard = obj;
    this.nextCardID = this._newInputCard.cardID + 1;
    // 여기다가 db로 보내는 로직 작성하면 될 듯
  },
});

const setStateProperty = (property, state) => {
  store[property] = state;
};

const getState = (property) => {
  return store[property];
};

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

const newCardWrapper = (id) => {
  return `<div class="new-card-wrapper" id="${id}">
  <input type="text" class="card-tittle-input" placeholder="제목을 입력하세요">
  <input type="text" class="card-text-input" placeholder="내용을 입력하세요">
  <div class="card-btn-wrapper">
    <button class="card-cancel-btn">취소</button>
    <button class="card-add-btn">등록</button>
  </div>
</div>`;
};

const cardWrapper = ({ cardID, tittle, text }) => {
  return `<div class="card-wrapper" id="${cardID}">
  <div class="card-header-wrapper">
    <h3 class="card-tittle">${tittle}</h3>
    <button class="card-remove-btn"></button>
  </div>
  <div class="card-text-wrapper">
    <p class="card-text">${text}</p>
  </div>
  <div class="card-footer-wrapper">
    <p class="card-footer-text">otter</p>
  </div>
</div>`;
};

const columnWrapperEl = document.querySelector('.column-wrapper');
columnWrapperEl.addEventListener('click', (e) => {
  if (e.target.className === 'column-add-btn') {
    columnWrapperEl.innerHTML += newCardWrapper('focused');
    document.querySelector('.column-add-btn').classList.add('active');
  }
});

columnWrapperEl.addEventListener('click', (e) => {
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
const getTargetParentByClassName = (node, className) => {
  if (node) {
    let current = node;
    while (current !== document.body) {
      if (current.className === className) return current;
      current = current.parentNode;
    }
    return false;
  }
};

function deleteNode(query) {
  document.querySelector(`${query}`).remove();
}
