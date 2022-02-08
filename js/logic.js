const quranSurahs = "https://api.quran.sutanlab.id/surah";
const surah = "https://api.quran.sutanlab.id/surah/104";

const fetch = (url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      switch (xhr.status) {
        case 200:
          let data = JSON.parse(xhr.responseText);
          console.log(data);
          cb(data);
          break;
        case 404:
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
