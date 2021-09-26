function decimeterToFeet(inp) {
  let feet = inp * 10 * 0.0328;

  let inches = Math.round(feet % 12);

  return `${Math.floor(feet)}' ${inches}''`;
}

function kgsToPound(inp) {
  let pounds = inp * 2.20462;

  return pounds.toFixed(2);
}

export { decimeterToFeet, kgsToPound };
