const ayahText = selector('.ayah-text');
const ayahTrans = selector('.ayah-trans');
const surahName = selector('.surah-name');
const audio = selector('.audio');

const playBtn = selector('.play');
const playPauseIcon = selector('.play i');
const next = selector('.next');
const back = selector('.back');

const surahContainer = (data) => {
  let verses = data.data.verses;

  let surahTag = data.data.name.long;
  let ayahAudios = [];
  let ayahTexts = [];
  let transAyahTexts = [];

  verses.forEach((verse) => {
    ayahAudios.push(verse.audio.primary);
    ayahTexts.push(verse.text.arab);
    transAyahTexts.push(verse.translation.en);
  });

  let ayahIndex = 0;
  changeAyah(ayahIndex);

  audio.addEventListener('ended', () => {
    ayahIndex++;
    changeAyah(ayahIndex);
  });

  function changeAyah(ayahNo) {
    if (ayahNo < ayahAudios.length) {
      audio.src = ayahAudios[ayahNo];
      ayahText.innerText = ayahTexts[ayahNo];
      ayahTrans.innerText = transAyahTexts[ayahNo];
      surahName.innerText = surahTag;
      audio.play();
    }
  }
};
let state = true;
playBtn.addEventListener('click', () => {
  if (state === true) {
    playPauseIcon.classList.add('fa-play');
    state = false;
    audio.pause();
  } else {
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
    state = true;
    audio.play();
  }
});

fetch(surah, surahContainer);
