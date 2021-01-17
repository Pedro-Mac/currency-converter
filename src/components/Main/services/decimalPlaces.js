export const defineDecimalPlaces = (value) => {
  if (value >= 1000) {
    return value.toFixed(2);
  } else if (value >= 0.001) {
    return value.toFixed(5);
  } else {
    return value.toFixed(7);
  }
};
