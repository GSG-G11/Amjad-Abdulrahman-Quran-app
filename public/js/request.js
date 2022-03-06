const fetchData = async (url, method, dataToSend) => {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend),
  });

  if (!res.ok) throw new Error('Something Wrong Happened');

  const data = await res.json();

  return data;
};

export default fetchData;
