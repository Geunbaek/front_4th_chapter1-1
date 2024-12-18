const getItem = (key) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
};

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
