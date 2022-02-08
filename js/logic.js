const quranSurahs = "https://api.quran.sutanlab.id/surah";
const surah = "https://api.quran.sutanlab.id/surah/108";

const fetch = (url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      switch (xhr.status) {
        case 200:
          let data = JSON.parse(xhr.responseText);
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
  xhr.open("GET", url);
  xhr.send();
};

const selector = (selector) => {
  return document.querySelector(selector);
};

function renderError(){
  const body = document.body;
  body.innerHTML = `<div class="error-img">
  <img src="https://http.cat/404"/>
  </div>`
}