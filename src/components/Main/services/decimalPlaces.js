export const defineDecimalPlaces = (value) => {
  if (value >= 1000) {
    return value.toFixed(2);
  } else if (value >= 100) {
    return value.toFixed(3);
  } else if (value >= 100) {
    return value.toFixed(4);
  } else if (value >= 0.01) {
    return value.toFixed(5);
  } else {
    return value.toFixed(7);
  }
};
