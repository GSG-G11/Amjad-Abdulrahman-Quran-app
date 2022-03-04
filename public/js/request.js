import { renderError } from './logic.js';

// const fetch = (url, cb) => {
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = () => {
//     if (xhr.status === 200) {
//       const data = JSON.parse(xhr.responseText || '{}');
//       return cb(data);
//     }

//     if (xhr.status === 404) return renderError();
//   };
//   xhr.open('GET', url);
//   xhr.send();
// };

const fetchData = async (url, cb) => {
  const data = await fetch(url);

  const response = await data.json();

  return cb(response);
};

export default fetchData;
