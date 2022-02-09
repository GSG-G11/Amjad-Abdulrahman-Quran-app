const { getDate, getWeekday, getTime, getRandomSurah } = require('./logic');

describe('date - time - day', () => {
  it('should get current Date', () => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const currentDate = new Date().toLocaleDateString('en-us', options);
    const expectedDate = getDate();

    expect(currentDate).toEqual(expectedDate);
  });

  it('should get weekday', () => {
    const currentDate = new Date();
    var options = { weekday: 'long' };
    const currentDay = new Intl.DateTimeFormat('en-US', options).format(
      currentDate
    );
    const expectWeekDay = getWeekday();
    expect(currentDay).toEqual(expectWeekDay);
  });

  it('should getTimes', () => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const expectedTime = getTime();

    expect(currentTime).toEqual(expectedTime);
  });

  it('should get a random Surah no', () => {
    const randomSurahNo = getRandomSurah();
    expect(randomSurahNo).toBeGreaterThan(0);
    expect(randomSurahNo).toBeLessThan(115);
  });
});
