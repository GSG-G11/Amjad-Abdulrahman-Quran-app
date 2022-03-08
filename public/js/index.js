import fetchData from './request.js';
import { select, createEl } from './utils.js';

const CLIENT_ID = 'kH9RTpwTF6ecLyiMZYLvRWkUoIerJwzeF67-7APIK-0';

const getRandSurah = () => Math.floor(Math.random() * 115);
const randomSurah = `https://api.quran.sutanlab.id/surah/${getRandSurah()}`;
const backgroundUrl = `https://api.unsplash.com/photos/random?query=nature&client_id=${CLIENT_ID}`;
const allSurahs = 'https://api.quran.sutanlab.id/surah';

const $body = select('body');
const $audioEl = select('audio');
const $playBtn = select('.play');
const $ayahText = select('.ayah-text');
const $transAyahText = select('.ayah-trans');
const $surahNameWrapper = select('.surah-name-wrapper');
const $surahName = select('.surah-name');
const $transSurahName = select('.surah-name-trans');
const $playPauseBtn = select('#play-pause-btn');
const $speakerIcon = select('#speaker-icon');
const $nextBtn = select('button.next');
const $prevBtn = select('button.back');
const $surahSelect = select('.surah-select');

const $fullDate = select('.date-fullDate');
const $day = select('.date-day');
const $time = select('.time');

const versesAudios = [];
const versesText = [];
const TransVersesText = [];

const fetchSurah = async (surahUrl) => {
  const {
    data: { verses, name },
  } = await fetchData(surahUrl);
  return { verses, name };
};

const getSurahDetails = (verses) => {
  verses.forEach(({ audio, text, translation }) => {
    versesAudios.push(audio.primary);
    versesText.push(text.arab);
    TransVersesText.push(translation.en);
  });
};

const renderSurahName = (name) => {
  $surahName.innerText = name.long;
  $transSurahName.innerText = name.transliteration.en;
};

const renderFirstVerse = () => {
  const [firstAudioVerse] = versesAudios;
  const [firstVerseText] = versesText;
  const [firstTransVerse] = TransVersesText;

  $audioEl.src = firstAudioVerse;
  $ayahText.innerText = firstVerseText;
  $transAyahText.innerText = firstTransVerse;
};

const renderSurah = async (surahUrl) => {
  const { verses, name } = await fetchSurah(surahUrl);
  getSurahDetails(verses);
  renderSurahName(name);
  renderFirstVerse();
};

const getVerse = (ayahNumber) => {
  $playPauseBtn.classList.add('fa-pause');

  $audioEl.src = versesAudios[ayahNumber];
  $ayahText.innerText = versesText[ayahNumber];
  $transAyahText.innerText = TransVersesText[ayahNumber];
};

const togglePlayState = () => {
  const isPaused = $audioEl.paused;

  if (isPaused) {
    $playPauseBtn.classList.remove('fa-play');
    $playPauseBtn.classList.add('fa-pause');
    return $audioEl.play();
  }

  $playPauseBtn.classList.remove('fa-pause');
  $playPauseBtn.classList.add('fa-play');
  return $audioEl.pause();
};

const toggleMuteState = () => {
  $speakerIcon.classList.toggle('fa-volume-mute');

  const isMuted = $audioEl.muted;

  $audioEl.muted = !isMuted;
};

const fetchAllSurahs = async () => {
  const { data } = await fetchData(allSurahs);
  return data;
};

// Render Surahs Select
const renderSurahsSelect = (data) => {
  data.forEach(({ name, number }) => {
    const $option = createEl('option', null, name.short);

    $option.value = number;

    $surahSelect.append($option);
  });
};

const changeBackground = ({ urls }) => {
  const image = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${urls.regular});`;

  $body.style.cssText = `background-image: ${image}`;
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
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date().toLocaleTimeString([], options);
};

const handleError = (err) => {
  $ayahText.classList.add('error');
  $transAyahText.classList.add('error');
  $ayahText.innerText = err;

  $transAyahText.innerText = 'Something Has Gone Wrong!';
};

export {
  renderSurah,
  getVerse,
  togglePlayState,
  toggleMuteState,
  renderSurahsSelect,
  fetchAllSurahs,
  getDate,
  getWeekday,
  getTime,
  changeBackground,
  handleError,
  versesAudios,
  versesText,
  TransVersesText,
  $audioEl,
  $ayahText,
  $transAyahText,
  $nextBtn,
  $prevBtn,
  $playBtn,
  $speakerIcon,
  $fullDate,
  $day,
  $time,
  $surahNameWrapper,
  $surahSelect,
  randomSurah,
  backgroundUrl,
};
