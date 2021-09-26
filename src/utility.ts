function decimeterToFeet(inp) {
  let feet = inp * 10 * 0.0328;

  let inches = Math.round(feet % 12);

  return `${Math.floor(feet)}' ${inches}''`;
}

export { decimeterToFeet };
