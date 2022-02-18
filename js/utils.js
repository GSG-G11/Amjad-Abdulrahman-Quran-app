const log = console.log;

//* Select A DOM Element
const select = (selector, scope) => (scope || document).querySelector(selector);

//* Select Multiple DOM Elements
const selectAll = (selector, scope) =>
  (scope || document).querySelectorAll(selector);

//* Create DOM Element
const createElement = (tag, className, text) => {
  const el = document.createElement(tag);
  if (className) el.classList.add(className);
  if (text) el.textContent = text;
  return el;
};

//* send Request
const fetch = (url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      switch (xhr.status) {
        case 200:
          const data = JSON.parse(xhr.responseText);
          cb(data);
          break;
        case 404:
          renderError();
          break;
        default:
          break;
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
};
