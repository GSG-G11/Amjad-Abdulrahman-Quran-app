const randomSurah = getRandomSurah();
const quranSurahs = 'https://api.quran.sutanlab.id/surah';
const surah = `https://api.quran.sutanlab.id/surah/${randomSurah}`;

const clientId = `client_id=Ru_LVQD9ON98fMDhBp1X-ELF5tnSBk3WK5q3sywX2E0`;
const clientId2 = `client_id=EKcJF8x4OLW7eeIIAQtY2Jj5J048MSbRjorTjzI3Gfg`;
const randomBackgroundUrl = `https://api.unsplash.com/photos/random?query=nature&${clientId}`;

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

const changeToPlayState = (playPauseIcon) => {
  playPauseIcon.classList.remove('fa-play');
  playPauseIcon.classList.add('fa-pause');
};

const changeToPauseState = (playPauseIcon) => {
  playPauseIcon.classList.remove('fa-pause');
  playPauseIcon.classList.add('fa-play');
};

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

module.exports = { getDate, getWeekday, getTime, getRandomSurah };

// todo remove client id
