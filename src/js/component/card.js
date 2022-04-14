const newCardWrapper = ({ id = '', tittle = '', text = '' }) => {
  return `<div class="new-card-wrapper" id=${id}>
    <input type="text" class="card-tittle-input" placeholder="제목을 입력하세요" value=${tittle}>
    <input type="text" class="card-text-input" placeholder="내용을 입력하세요" value=${text}>
    <div class="card-btn-wrapper">
      <button class="card-cancel-btn">취소</button>
      <button class="card-add-btn">등록</button>
    </div>
  </div>`;
};

const cardWrapper = ({ tittle, text }) => {
  return `<div class="card-wrapper">
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

export { newCardWrapper, cardWrapper };
