const renderError = () => {
  const { body } = document;
  body.innerHTML = `<div class="error-img">
  <img src="https://http.cat/404"/>
  </div>`;
  return body;
};

const getRandSurah = () => Math.floor(Math.random() * 115);

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

export { renderError, getDate, getTime, getWeekday, getRandSurah };
