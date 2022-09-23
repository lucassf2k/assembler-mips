function baseConverter(
  number, 
  size, 
  baseFrom, 
  baseTo
) {
  const binary = parseInt(number, baseFrom).toString(baseTo);

  const zeroLeft = size ? '0'.repeat(size - binary.length) : '';
  
  return `${zeroLeft}${binary}`;
} 

function toConvertHexToBin(number, size = 0) {
  return baseConverter(number, size, 16, 2);
}

function toConvertHexToDec(number, size = 0) {
  return baseConverter(number, size, 16, 10);
}

function toConvertBinToHex(number, size = 0) {
  return baseConverter(number, size, 2, 16);
}

function toConvertDecToHex(number, size = 0) {
  return baseConverter(number, size, 10, 16);
}

function toConvertBinToDec(number, size = 0) {
  return baseConverter(number, size, 2, 10);
}

function toConvertDecToBin(number, size = 0) {
  return baseConverter(number, size, 10, 2);
}

export { 
  toConvertDecToBin, 
  toConvertBinToDec,
  toConvertDecToHex,
  toConvertBinToHex,
  toConvertHexToDec,
  toConvertHexToBin
};