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

function findTwoscomplement(str) {
  let n = str.length;

  let i;
  for (i = n - 1; i >= 0; i--)
      if (str.charAt(i) == '1')
          break;

  if (i == -1)
      return "1" + str;

  let k;
  for (k = i - 1; k >= 0; k--) {
      if (str.charAt(k) == '1')
          str = str.substring(0,k)+"0"+str.substring(k+1, str.length);
      else
          str = str.substring(0,k)+"1"+str.substring(k+1, str.length);
  }
  
  return str.toString();
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
  if (number < 0) {
    return findTwoscomplement(baseConverter(number, size, 16, 2)); 
  } else {
    return baseConverter(number, size, 10, 2);
  }
}

export { 
  toConvertDecToBin, 
  toConvertBinToDec,
  toConvertDecToHex,
  toConvertBinToHex,
  toConvertHexToDec,
  toConvertHexToBin,
  findTwoscomplement
};