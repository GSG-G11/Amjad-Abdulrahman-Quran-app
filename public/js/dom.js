/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
// // select surah
// surahNameWrapper.addEventListener('click', () => {
//   surahSelect.style.display = 'block';

//   // smooth enter animation
//   setTimeout(() => {
//     surahSelect.style.opacity = '1';
//     surahSelect.style.transform = 'translateY(0)';
//   }, 0);
// });

// surahSelect.addEventListener('change', (e) => {
//   const selectedSurah = surahSelect.value;
//   const surah = `https://api.quran.sutanlab.id/surah/${selectedSurah}`;

//   surahSelect.style.opacity = '0';

//   // smooth exit animation
//   setTimeout(() => (surahSelect.style.display = 'none'), 500);

//   fetch(surah, fetchSurah);
// });

// window.onload = () => {
//   $fullDate.innerText = getDate();
//   $day.innerText = getWeekday();
//   $time.innerText = getTime();
// };

// Render Select Surahs
// const renderSurahsDropList = ({ data }) => {
//   data.forEach((surah) => {
//     const $option = createEl('option', null, surah.name.short);

//     $option.value = surah.number;

//     $surahSelect.append($option);
//   });
// };

// change background Image
// const changeBackground = (response) => {
//   const image = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
//         url(${response.urls.regular});`;

//   $body.style.cssText = `background-image: ${image}`;
// };

import fetch from './request.js';
// import { getDate, getTime, getWeekday, getRandSurah } from './logic.js';
import { createEl, select } from './utils.js';

const $body = select('body');
const $ayahText = select('.ayah-text');
const $ayahTrans = select('.ayah-trans');
const $surahName = select('.surah-name');
const $surahNameTrans = select('.surah-trans');
const $audioEl = select('.audio');
const $playBtn = select('.play');
const $playPauseIcon = select('.play i');
const $speakerIcon = select('.app-speaker-icon i');
const $nextBtn = select('.next');
const $backBtn = select('.back');
// const $surahSelect = select('.surah-select');
// const $fullDate = select('.date-fullDate');
// const $day = select('.date-day');
// const $time = select('.time');
// const $surahNameWrapper = select('.surah-name-wrapper');
// const backgroundUrl = `https://api.unsplash.com/photos/random?query=nature&client_id=kH9RTpwTF6ecLyiMZYLvRWkUoIerJwzeF67-7APIK-0`;
// const allSurahsUrl = 'https://api.quran.sutanlab.id/surah';
const surahUrl = 'https://api.quran.sutanlab.id/surah/108';

let ayahNumber = 0;
const ayahAudios = [];
const ayahTexts = [];
const transAyahTexts = [];

function togglePlayState() {
  const isPaused = $audioEl.paused;

  $playPauseIcon.className = isPaused ? 'fas fa-pause' : 'fas fa-play';

  if (isPaused) return $audioEl.play();

  return $audioEl.pause();
}

function toggleMuteState() {
  const isMuted = $audioEl.muted;

  $speakerIcon.className = isMuted ? 'fas fa-volume-up' : 'fas fa-volume-mute';
  $audioEl.muted = !isMuted;
}

function getSurahInfo({ data }) {
  const versesDetails = data.verses;
  const surahName = data.name.long;
  const transSurahName = data.name.transliteration.en;

  versesDetails.forEach(({ audio, text, translation }) => {
    ayahAudios.push(audio.primary);
    ayahTexts.push(text.arab);
    transAyahTexts.push(translation.en);
  });

  return { versesDetails, ayahAudios, ayahTexts, transAyahTexts, surahName, transSurahName };
}

function renderAyah(ayahNumber, surahDetails) {
  const { surahName, transSurahName, ayahAudios, ayahTexts, transAyahTexts } = surahDetails;

  if (ayahNumber >= ayahAudios.length || ayahNumber < 0) return;

  $audioEl.src = ayahAudios[ayahNumber];
  $ayahText.innerText = ayahTexts[ayahNumber];
  $ayahTrans.innerText = transAyahTexts[ayahNumber];
  $surahName.innerText = surahName;
  $surahNameTrans.innerText = transSurahName;

  return surahDetails;
}
function changeAyahOnEnd(ayahNumber, surahDetails) {
  return $audioEl.addEventListener('ended', () => renderAyah(++ayahNumber, surahDetails));
}

fetch(surahUrl, getSurahInfo)
  .then((surahDetails) => renderAyah(ayahNumber, surahDetails))
  .then((surahDetails) => {
    changeAyahOnEnd(ayahNumber, surahDetails);

    $nextBtn.addEventListener('click', () => {
      const isLastAyah = ayahNumber === ayahAudios.length - 1;

      !isLastAyah && renderAyah((ayahNumber += 1), surahDetails);
    });

    $backBtn.addEventListener('click', () => {
      const isFirstAyah = ayahNumber === 0;

      !isFirstAyah && renderAyah((ayahNumber -= 1), surahDetails);
    });
  });

// Toggle play state
$playBtn.addEventListener('click', togglePlayState);

// Toggle mute state
$speakerIcon.addEventListener('click', toggleMuteState);

// fetch(backgroundUrl, changeBackground);
// fetch(allSurahsUrl, renderSurahsDropList);
