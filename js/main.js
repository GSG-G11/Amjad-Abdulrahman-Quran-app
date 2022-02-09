const ayahText = selector('.ayah-text');
const ayahTrans = selector('.ayah-trans');
const surahName = selector('.surah-name');
const audio = selector('.audio');
const playBtn = selector('.play');
const playPauseIcon = selector('.play i');
const nextBtn = selector('.next');
const backBtn = selector('.back');

const fullDate = selector('.date-fullDate');
const day = selector('.date-day');
const time = selector('.time');

const speakerIcon = selector('.app-speaker-icon i');

fullDate.innerText = getDate();
day.innerText = getWeekday();
time.innerText = getTime();

const surahContainer = (data) => {
  let verses = data.data.verses;

  let surahTag = data.data.name.long;
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

  // change ayah automatically after initial click
  audio.addEventListener('ended', () => {
    ayahIndex++;
    changeAyah(ayahIndex);
  });

  // Next Ayah
  nextBtn.addEventListener('click', () => {
    lastAyah = ayahIndex > ayahAudios.length;
    !lastAyah && changeAyah(++ayahIndex);
  });

  // Previous Ayah
  backBtn.addEventListener('click', () => {
    firstAyah = ayahIndex === 0;
    !firstAyah && changeAyah(--ayahIndex);
  });

  function changeAyah(ayahNo) {
    if (ayahNo < ayahAudios.length) {
      audio.src = ayahAudios[ayahNo];
      ayahText.innerText = ayahTexts[ayahNo];
      ayahTrans.innerText = transAyahTexts[ayahNo];
      surahName.innerText = surahTag;
    }
  }
};

// Toggle play state
let playState = true;
playBtn.addEventListener('click', () => {
  if (playState === true) {
    playPauseIcon.classList.add('fa-play');
    playState = false;
    audio.pause();
  } else {
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
    playState = true;
    audio.play();
  }
});

// Toggle mute state
let muteState = false;
speakerIcon.addEventListener('click', (e) => {
  if (muteState === false) {
    speakerIcon.classList.add('fa-volume-mute');
    audio.muted = true;

    muteState = true;
  } else {
    speakerIcon.classList.remove('fa-volume-mute');
    speakerIcon.classList.add('fa-volume-up');
    audio.muted = false;

    muteState = false;
  }
});

fetch(surah, surahContainer);
