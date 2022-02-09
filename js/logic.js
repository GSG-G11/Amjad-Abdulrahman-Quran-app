const randomSurah = getRandomSurah();
const quranSurahs = 'https://api.quran.sutanlab.id/surah';
const surah = `https://api.quran.sutanlab.id/surah/${randomSurah}`;

const fetch = (url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      switch (xhr.status) {
        case 200:
          let data = JSON.parse(xhr.responseText);
          console.log(data)
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

const selector = (selector) => {
  return document.querySelector(selector);
};

function renderError() {
  const body = document.body;
  body.innerHTML = `<div class="error-img">
  <img src="https://http.cat/404"/>
  </div>`;
}

function getRandomSurah() {
  return Math.floor(Math.random() * 115);
}

const getDate = () => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date().toLocaleDateString('en-us', options);
};

const getWeekday = () => {
  const currentDate = new Date();
  var options = { weekday: 'long' };
  return new Intl.DateTimeFormat('en-US', options).format(currentDate);
};

const getTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// todo surah name translation
// todo play btn on first click doesn't change bug
// todo header responsive
// todo main section ayah width
