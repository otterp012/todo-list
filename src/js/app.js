const store = {
  focusedCard: null,
  newInputCard: {
    tittle: null,
    text: null,
  },
};

const setStateProperty = (property, state) => {
  store[property] = state;
};

const cardRemoveBtnEl = document.querySelector('.card-remove-btn');
const modalWrapperEl = document.querySelector('.modal-wrapper');

// cardRemoveBtnEl.addEventListener('click', (e) => {
//   modalWrapperEl.classList.add('active');
//   console.log(e.currentTarget);
//   e.currentTarget.setAttribute('focusedCard', true);
// });

const modalCancelBtnEl = document.querySelector('.modal-cancel-btn');
modalCancelBtnEl.addEventListener('click', () => {
  modalWrapperEl.classList.remove('active');
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

const cardWrapper = (array) => {
  const [tittle, text] = array;
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
const columnWrapperEl = document.querySelector('.column-wrapper');
// columnWrapperEl.addEventListener('click', (e) => {
//   if (e.target.className === 'column-add-btn') {
//     columnWrapperEl.innerHTML += newCardWrapper('focused');
//   }
// });

// columnWrapperEl.addEventListener('click', (e) => {
//   if (e.target.className === 'card-cancel-btn') {
//     document.querySelector('#focused').remove();
//   }
// });
// async function init() {
//   const first = await one();
//   first.then(() => two());
// }
function one() {
  columnWrapperEl.addEventListener('click', (e) => {
    if (e.target.className === 'column-add-btn') {
      columnWrapperEl.innerHTML += newCardWrapper('focused');
      return document.querySelector('#focused');
    }
  });
}

// root()
//   .then(($root) => document.body.append($root) || $root)
//   .then(($root) => Promise.all([$root, div()]))
//   .then(([r, d]) => r.append(d));
// async function div() {
//   const $div = document.createElement('div');
//   $div.textContent = 'Hello World';
//   $div.className = 'container';
//   return $div;
// }
// async function root() {
//   const $root = document.createElement('div');
//   $root.id = 'root';
//   return $root;
// }

document.body.addEventListener('click', () => console.log(one()));
// const newta = one();
// console.log(newta);
// newFocus.addEventListener('click', (e) => {
//   if (e.target.className === 'card-add-btn') {
//     const focusedCard = document.querySelector('#focused');
//     const data = [...focusedCard.children]
//       .filter((v) => v.tagName === 'INPUT')
//       .map((v) => v.value);
//     columnWrapperEl.innerHTML += cardWrapper(data);
//   }

//   if (e.target.className === 'card-cancel-btn') {
//     e.currentTarget.remove();
//   }
// });

// function two() {
//   const newCardWrapperEl = document.querySelector('.new-card-wrapper');

//   if (newCardWrapperEl) {
//     newCardWrapperEl.addEventListener('click', (e) => {
//       if (e.target.className === 'card-add-btn') {
//         const focusedCard = document.querySelector('#focused');
//         const data = [...focusedCard.children]
//           .filter((v) => v.tagName === 'INPUT')
//           .map((v) => v.value);
//         columnWrapperEl.innerHTML += cardWrapper(data);
//       }

//       if (e.target.className === 'card-cancel-btn') {
//         e.currentTarget.remove();
//       }
//     });
//   }
// }
// init();
// cardWrapperEl.addEventListener('click', (e) => {
//   console.log(e.target);
//   if (e.target.className === 'card-add-btn') {
//     const focusedCard = document.querySelector('#focused');
//     const data = [...focusedCard.children]
//       .filter((v) => v.tagName === 'INPUT')
//       .map((v) => v.value);
//     columnWrapperEl.innerHTML += cardWrapper(data);
//   }

//   if (e.target.className === 'card-cancel-btn') {
//     e.currentTarget.remove();
//   }
// });

// const deleteNode = (query) => document.querySelector(`${query}`).remove();

function deleteNode(query) {
  document.querySelector(`${query}`).remove();
}
