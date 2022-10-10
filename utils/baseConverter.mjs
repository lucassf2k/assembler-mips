// função que converte em qualquer uma das bases dependendo do dos valores passados nos parâmetros
function baseConverter(
  number, 
  size, 
  baseFrom, 
  baseTo
) {
  const binary = parseInt(number, baseFrom).toString(baseTo); // retorna o valor já convertido dependendo dos parêmetros

  const calculateSize = (size - binary.length) < 0 ? 0 : (size - binary.length); 

  const zeroLeft = size ? '0'.repeat(calculateSize) : ''; // fiz para obter a conversão em um tamanho específico
  
  return `${zeroLeft}${binary}`; // retorna a conversão concatenando com os zeros a esquerda no binário
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

// são funções já pré-determinadas para as bases específicas

// converte de hexadecimal em binário
function toConvertHexToBin(number, size = 0) {
  return baseConverter(number, size, 16, 2);
}

// converte de hexadecimal em decimal
function toConvertHexToDec(number, size = 0) {
  return baseConverter(number, size, 16, 10);
}

// converte de binário em hexadecimal
function toConvertBinToHex(number, size = 0) {
  return baseConverter(number, size, 2, 16);
}

// converte de decimal em hexadecimal
function toConvertDecToHex(number, size = 0) {
  return baseConverter(number, size, 10, 16);
}

// converte de binário em decimal
function toConvertBinToDec(number, size = 0) {
  return baseConverter(number, size, 2, 10);
}

// converte de decimal em binário
function toConvertDecToBin(number, size = 0) {
  // se o número for menor que zero ele pega o binário desse número e transforma em complemento de dois
  // aonde pega o binário inverte todos os bite e soma 1 para obter-se o complemento de dois
  if (number < 0) {
    return findTwoscomplement(baseConverter(number, size, 16, 2)); 
  } else {
    return baseConverter(number, size, 10, 2);
  }
}

// exportando para outros arquivos poderem utilizá-las
export { 
  toConvertDecToBin, 
  toConvertBinToDec,
  toConvertDecToHex,
  toConvertBinToHex,
  toConvertHexToDec,
  toConvertHexToBin,
  findTwoscomplement
};