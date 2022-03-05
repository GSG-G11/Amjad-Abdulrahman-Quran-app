const { log } = console;

//* Select A DOM Element
const select = (selector, scope) => (scope || document).querySelector(selector);

//* Select Multiple DOM Elements
const selectAll = (selector, scope) => (scope || document).querySelectorAll(selector);

//* Create DOM Element
const createEl = (tag, className, text) => {
  const el = document.createElement(tag);
  if (className) el.classList.add(className);
  if (text) el.textContent = text;
  return el;
};

export { log, select, selectAll, createEl };
