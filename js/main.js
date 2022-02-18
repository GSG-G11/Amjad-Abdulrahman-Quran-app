const ayahText = select('.ayah-text');
const ayahTrans = select('.ayah-trans');
const surahName = select('.surah-name');
const surahNameTrans = select('.surah-trans');
const audio = select('.audio');
const playBtn = select('.play');
const playPauseIcon = select('.play i');
const speakerIcon = select('.app-speaker-icon i');
const nextBtn = select('.next');
const backBtn = select('.back');
const surahSelect = select('.surah-select');
const fullDate = select('.date-fullDate');
const day = select('.date-day');
const time = select('.time');
const surahNameWrapper = select('.surah-name-wrapper');

fullDate.innerText = getDate();
day.innerText = getWeekday();
time.innerText = getTime();

const fetchSurah = (response) => {
  const verses = response.data.verses;
  let surahTag = response.data.name.long;
  let surahTransTag = response.data.name.transliteration.en;
  let ayahAudios = [];
  let ayahTexts = [];
  let transAyahTexts = [];
  let ayahIndex = 0;

  verses.forEach((verse) => {
    ayahAudios.push(verse.audio.primary);
    ayahTexts.push(verse.text.arab);
    transAyahTexts.push(verse.translation.en);
  });

  // start ayah on initial click
  changeAyah(ayahIndex);
  changeToPlayState(playPauseIcon, audio);

  // change ayah automatically after initial click
  audio.addEventListener('ended', () => {
    ayahIndex++;
    changeAyah(ayahIndex);
  });

  // Next Ayah
  nextBtn.addEventListener('click', () => {
    lastAyah = ayahIndex > ayahAudios.length;
    !lastAyah && changeAyah(++ayahIndex);
    changeToPlayState(playPauseIcon, audio);
  });

  // Previous Ayah
  backBtn.addEventListener('click', () => {
    firstAyah = ayahIndex === 0;
    !firstAyah && changeAyah(--ayahIndex);
    changeToPlayState(playPauseIcon, audio);
  });

  function changeAyah(ayahNo) {
    if (ayahNo < ayahAudios.length) {
      audio.src = ayahAudios[ayahNo];
      ayahText.innerText = ayahTexts[ayahNo];
      ayahTrans.innerText = transAyahTexts[ayahNo];
      surahName.innerText = surahTag;
      surahNameTrans.innerText = surahTransTag;
    }
  }
};

// select surah
surahNameWrapper.addEventListener('click', () => {
  surahSelect.style.display = 'block';

  // smooth enter animation
  setTimeout(() => {
    surahSelect.style.opacity = '1';
    surahSelect.style.transform = 'translateY(0)';
  }, 0);
});

// Toggle play state
playBtn.addEventListener('click', () => {
  if (playState) {
    return changeToPlayState(playPauseIcon, audio);
  }

  changeToPauseState(playPauseIcon, audio);
});

// Toggle mute state
speakerIcon.addEventListener('click', (e) => {
  if (!muted) {
    return muteSound(speakerIcon, audio);
  }

  unMuteSound(speakerIcon, audio);
});

window.onload = () => {
  const surah = `https://api.quran.sutanlab.id/surah/1`;
  fetch(surah, fetchSurah);
};

surahSelect.addEventListener('change', (e) => {
  const selectedSurah = surahSelect.value;
  const surah = `https://api.quran.sutanlab.id/surah/${selectedSurah}`;

  surahSelect.style.opacity = '0';

  // smooth exit animation
  setTimeout(() => (surahSelect.style.display = 'none'), 500);

  fetch(surah, fetchSurah);
});

fetch(randomBackgroundUrl, (response) => {
  document.body.style.cssText = `background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url(${response.urls.regular});`;
});

fetch(allSurahs, renderSurahsList);
