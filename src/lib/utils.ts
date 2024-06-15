export function unHumanizeSize(sizeStr: string): number {
  const sizePattern = /([\d.]+)\s*([KMGT]?B)/i;
  const matches = sizeStr.match(sizePattern);

  if (!matches) {
    throw new Error(`Invalid size format: ${sizeStr}`);
  }

  const sizeValue = parseFloat(matches[1]);
  const sizeUnit = matches[2].toUpperCase();

  const unitMultipliers: { [key: string]: number } = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
  };

  return sizeValue * (unitMultipliers[sizeUnit] || 1);
}
