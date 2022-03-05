// import { renderError } from './logic.js';

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

const fetchData = async (url, method, dataToSend) => {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend),
  });

  if (!res.ok) throw new Error('Something Wrong Happened');

  const data = await res.json();

  return data;
};

export default fetchData;
