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

export { store, setStateProperty, getState };
