const { getDate, getWeekday, getTime, getRandomSurah } = require('./logic');

describe('date - time - day', () => {
  // 1- Date
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

  // 2- Weekday
  it('should get weekday', () => {
    const currentDate = new Date();
    const options = { weekday: 'long' };
    const currentDay = new Intl.DateTimeFormat('en-US', options).format(
      currentDate
    );
    const expectWeekDay = getWeekday();
    expect(currentDay).toEqual(expectWeekDay);
  });

  // 3- Time
  it('should getTimes', () => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const expectedTime = getTime();

    expect(currentTime).toEqual(expectedTime);
  });
});
