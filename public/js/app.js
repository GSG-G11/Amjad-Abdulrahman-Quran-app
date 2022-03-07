import {
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
} from './index.js';
import fetchData from './request.js';

Promise.all([
  renderSurah(randomSurah),
  fetchAllSurahs().then(renderSurahsSelect),
  fetchData(backgroundUrl)
    .then(changeBackground)
    .catch((err) =>
      // eslint-disable-next-line no-console
      console.log(`somehing wrong happened when fetching data from ${err.message}`),
    ),
]);

$fullDate.innerText = getDate();
$day.innerText = getWeekday();
$time.innerText = getTime();

$playBtn.addEventListener('click', togglePlayState);

$speakerIcon.addEventListener('click', toggleMuteState);

let ayahNumber = 0;
// Play next ayah on end each ayah
$audioEl.addEventListener('ended', () => {
  if (ayahNumber > versesAudios.length - 2) return;

  ayahNumber += 1;
  $audioEl.src = versesAudios[ayahNumber];
  $ayahText.innerText = versesText[ayahNumber];
  $transAyahText.innerText = TransVersesText[ayahNumber];
});
// Get Next Verse
$nextBtn.addEventListener('click', () => {
  if (ayahNumber > versesAudios.length - 2) {
    ayahNumber = 0; // go the first ayah
    return getVerse(ayahNumber);
  }

  ayahNumber += 1;
  return getVerse(ayahNumber);
});

// Get Previous verse
$prevBtn.addEventListener('click', () => {
  if (ayahNumber === 0) {
    return;
  }

  ayahNumber -= 1;
  return getVerse(ayahNumber);
});

$surahNameWrapper.addEventListener('click', () => {
  const styles = 'z-index: 99; opacity: 1; transform: translateY(1rem)';
  $surahSelect.style.cssText = styles;
});

$surahSelect.addEventListener('input', () => {
  const selectedSurahNum = $surahSelect.value;
  const selectedSurahUrl = `https://api.quran.sutanlab.id/surah/${selectedSurahNum}`;

  // Reset All
  versesAudios.length = 0;
  versesText.length = 0;
  TransVersesText.length = 0;

  renderSurah(selectedSurahUrl).catch(handleError);
  // smooth exit animation
  $surahSelect.style.cssText = 'opacity = 0; z-index: -999';
});
