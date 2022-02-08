const play = selector(".play");

const surahContainer = (data) => {
  selector(".ayah-text").textContent = data.data.verses[0].text.arab;
  selector(".ayah-trans").textContent = data.data.verses[0].translation.en;
  selector(".audio").src = data.data.verses[0].audio.primary;
  selector(".surah-name").textContent = data.data.name.long;
};

play.addEventListener("click", () => {
  const sound = selector(".audio");
  sound.play();
});

fetch(surah, surahContainer);
