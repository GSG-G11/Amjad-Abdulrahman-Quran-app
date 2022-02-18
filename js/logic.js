const { CLIENT_ID } = config;
const randomBackgroundUrl = `https://api.unsplash.com/photos/random?query=nature&${CLIENT_ID}`;
const allSurahs = 'https://api.quran.sutanlab.id/surah';

const renderError = () => {
  const body = document.body;
  body.innerHTML = `<div class="error-img">
  <img src="https://http.cat/404"/>
  </div>`;
  return body;
};

const renderSurahsList = (response) => {
  response.data.forEach((surah) => {
    const option = createElement('option', null, surah.name.short);
    option.value = surah.number;

    surahSelect.append(option);
  });
};

let playState = true;
const changeToPlayState = (playPauseIcon, audio) => {
  playPauseIcon.classList.remove('fa-play');
  playPauseIcon.classList.add('fa-pause');
  audio.play();

  playState = false;
};

const changeToPauseState = (playPauseIcon, audio) => {
  playPauseIcon.classList.remove('fa-pause');
  playPauseIcon.classList.add('fa-play');
  audio.pause();

  playState = true;
};

let muted = false;
const muteSound = (speakerIcon, audio) => {
  speakerIcon.classList.add('fa-volume-mute');
  audio.muted = true;

  muteState = true;
};

const unMuteSound = (speakerIcon, audio) => {
  speakerIcon.classList.remove('fa-volume-mute');
  speakerIcon.classList.add('fa-volume-up');
  t;
  audio.muted = false;

  muteState = false;
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
  const options = { weekday: 'long' };
  return new Intl.DateTimeFormat('en-US', options).format(currentDate);
};

const getTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

if (typeof module === undefined) {
  module.exports = { getDate, getWeekday, getTime };
}
