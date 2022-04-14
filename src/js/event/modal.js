const modalEvent = () => {
  const modalCancelBtnEl = document.querySelector('.modal-cancel-btn');
  const modalRemoveBtnEl = document.querySelector('.modal-remove-btn');
  modalRemoveBtnEl.addEventListener('click', removeBtnClickEventHandler);
  modalCancelBtnEl.addEventListener('click', cancelBtnClickEventHandler);
};

const removeBtnClickEventHandler = () => {
  const modalWrapperEl = document.querySelector('.modal-wrapper');
  const focusedCard = document.querySelector('.focused');
  const removedData = getTargetChild(focusedCard, 'card-text').textContent;

  document.querySelector('.log-wrapper').innerHTML += log(
    removedData,
    'remove'
  );

  focusedCard.remove();
  modalWrapperEl.classList.remove('active');
};

const cancelBtnClickEventHandler = () => {
  const modalWrapperEl = document.querySelector('.modal-wrapper');
  modalWrapperEl.classList.remove('active');
};

export { modalEvent };
